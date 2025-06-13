import { and, eq } from "drizzle-orm"

import type { AppContext } from ".."
import { HTTPException } from "hono/http-exception"
import { Hono } from "hono"
import {
	insertTransactionSchema,
	updateTransactionSchema,
} from "../db/arktype/transaction"
import { transaction } from "../db/schema"
import { arktypeValidator } from "@hono/arktype-validator"

export const transactionsRoute = new Hono<AppContext>()
	.get("/:id", async (c) => {
		const id = c.req.param("id")
		const db = c.var.DrizzleDB

		const session = c.var.session
		if (!session) {
			console.error("no session", session)
			throw new HTTPException(401, { message: "Unauthorized" })
		}

		return c.json(
			await db
				?.select()
				.from(transaction)
				.where(and(eq(transaction.userId, session.user.id), eq(transaction.pocketId, id))),
		)
	})
	.post(
		"/",
		arktypeValidator("json", insertTransactionSchema),
		async (c) => {
			const data = c.req.valid("json")
			const db = c.var.DrizzleDB
			const session = c.var.session
			if (!session) {
				console.error("no session", session)
				throw new HTTPException(401, { message: "Transaction not found or unauthorized" })
			}

			// Add the userId to the transaction
			const transactionData = {
				...data,
				userId: session.user.id,
			}

			const insertedTransaction = await db.insert(transaction).values(transactionData).returning()
			return c.json(insertedTransaction)
		},
	)
	.post(
		"/:id",
		arktypeValidator("json", updateTransactionSchema),
		async (c) => {
			const id = c.req.param("id")
			const data = c.req.valid("json")
			const db = c.var.DrizzleDB
			const session = c.var.session

			if (!session) {
				console.error("no session", session)
				throw new HTTPException(401, { message: "Unauthorized" })
			}

			// Check if the transaction belongs to the user
			const existingTransaction = await db
				.select()
				.from(transaction)
				.where(and(eq(transaction.id, id), eq(transaction.userId, session.user.id)))
				.get()

			if (!existingTransaction) {
				throw new HTTPException(404, { message: "Transaction not found or unauthorized" })
			}

			const updatedTransaction = await db.update(transaction).set(data).where(eq(transaction.id, id)).returning()

			return c.json(updatedTransaction)
		},
	)
	.delete("/:id", async (c) => {
		const id = c.req.param("id")
		const db = c.var.DrizzleDB
		const session = c.var.session

		if (!session) {
			console.error("no session", session)
			throw new HTTPException(400, { message: "Transaction not found or unauthorized" })
		}

		// Check if the transaction belongs to the user
		const deletedTransaction = await db
			.delete(transaction)
			.where(and(eq(transaction.id, id), eq(transaction.userId, session.user.id)))
			.returning()

		if (!deletedTransaction.length) {
			throw new HTTPException(400, { message: "Transaction not found or unauthorized" })
		}

		return c.json({ success: true, deletedTransaction })
	})

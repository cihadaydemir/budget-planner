import { and, eq } from "drizzle-orm"

import type { AppContext } from ".."
import { Hono } from "hono"
import { insertTransactionSchema } from "../db/zod/transaction"
import { transaction } from "../db/schema"
import { zValidator } from "@hono/zod-validator"

const app = new Hono<AppContext>()

app.get("/", async (c) => {
	const db = c.var.DrizzleDB

	const session = c.var.session
	if (!session) {
		console.error("no session", session)
		return c.json({ error: "Unauthorized" }, 401)
	}

	return c.json(await db?.select().from(transaction).where(eq(transaction.userId, session.user.id)))
})

app.get("/:id", async (c) => {
	const id = c.req.param("id")
	const db = c.var.DrizzleDB

	const session = c.var.session
	if (!session) {
		console.error("no session", session)
		return c.json({ error: "Unauthorized" }, 401)
	}

	return c.json(
		await db
			?.select()
			.from(transaction)
			.where(and(eq(transaction.userId, session.user.id), eq(transaction.pocketId, id))),
	)
})

app.post(
	"/",
	zValidator("json", insertTransactionSchema, (result, c) => {
		if (!result.success) {
			return c.json({ error: result.error.message }, 400)
		}
	}),
	async (c) => {
		const data = c.req.valid("json")
		const db = c.var.DrizzleDB
		const session = c.var.session
		if (!session) {
			console.error("no session", session)
			return c.json({ error: "Unauthorized" }, 401)
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

app.put(
	"/:id",
	zValidator("json", insertTransactionSchema, (result, c) => {
		if (!result.success) {
			return c.json({ error: result.error.message }, 400)
		}
	}),
	async (c) => {
		const id = c.req.param("id")
		const data = c.req.valid("json")
		const db = c.var.DrizzleDB
		const session = c.var.session

		if (!session) {
			console.error("no session", session)
			return c.json({ error: "Unauthorized" }, 401)
		}

		// Check if the transaction belongs to the user
		const existingTransaction = await db
			.select()
			.from(transaction)
			.where(and(eq(transaction.id, id), eq(transaction.userId, session.user.id)))
			.get()

		if (!existingTransaction) {
			return c.json({ error: "Transaction not found or unauthorized" }, 400)
		}

		const updatedTransaction = await db.update(transaction).set(data).where(eq(transaction.id, id)).returning()

		return c.json(updatedTransaction)
	},
)

app.delete("/:id", async (c) => {
	const id = c.req.param("id")
	const db = c.var.DrizzleDB
	const session = c.var.session

	if (!session) {
		console.error("no session", session)
		return c.json({ error: "Unauthorized" }, 401)
	}

	// Check if the transaction belongs to the user
	const existingTransaction = await db
		.select()
		.from(transaction)
		.where(and(eq(transaction.id, id), eq(transaction.userId, session.user.id)))
		.get()

	if (!existingTransaction) {
		return c.json({ error: "Transaction not found or unauthorized" }, 400)
	}

	await db.delete(transaction).where(eq(transaction.id, id))

	return c.json({ success: true, message: "Transaction deleted successfully" })
})

export const transactionsRoute = app

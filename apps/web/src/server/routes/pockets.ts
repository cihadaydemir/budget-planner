import { and, eq } from "drizzle-orm"
import { pocket, transaction } from "../db/schema"

import type { AppContext } from ".."
import { HTTPException } from "hono/http-exception"
import { Hono } from "hono"

import { type ExtendedPocket, insertPocketSchema } from "../db/zod"
import { zValidator } from "@hono/zod-validator"

//TODO: checek if zValidators are correct or there are better ways to do it
export const pocketsRoute = new Hono<AppContext>()
	.get("/", async (c) => {
		const db = c.var.DrizzleDB

		const session = c.var.session
		if (!session) {
			console.error("no session in api route", session)
			throw new HTTPException(401, { message: "Unauthorized" })
		}
		const pocketsWithTransactions = await db
			.select({
				pocket,
				transactionAmount: transaction.amount,
			})
			.from(pocket)
			.leftJoin(transaction, eq(pocket.id, transaction.pocketId))
			.where(eq(pocket.userId, session.user.id))

		const responseObject = pocketsWithTransactions.reduce<Record<string, ExtendedPocket>>((acc, row) => {
			const pocketId = row.pocket.id

			if (!acc[pocketId]) {
				acc[pocketId] = {
					id: pocketId,
					name: row.pocket.name,
					userId: row.pocket.userId,
					budget: row.pocket.budget,
					createdAt: row.pocket.createdAt,
					updatedAt: row.pocket.updatedAt,
					deletedAt: row.pocket.deletedAt,
					description: row.pocket.description,
					totalSpent: 0,
				}
			}

			if (row.transactionAmount !== null) {
				acc[pocketId].totalSpent += row.transactionAmount
			}

			return acc
		}, {})

		const pocketsWithTotalSpent = Object.values(responseObject)
		return c.json(pocketsWithTotalSpent)
	})
	.post(
		"/",
		zValidator("json", insertPocketSchema, (result, c) => {
			if (!result.success) {
				throw new HTTPException(400, { message: result.error.message })
			}
		}),
		async (c) => {
			const data = c.req.valid("json")
			const db = c.var.DrizzleDB
			const session = c.var.session

			if (!session) {
				console.error("no session", session)
				throw new HTTPException(401, { message: "Unauthorized" })
			}

			const insertedPocket = await db
				.insert(pocket)
				.values({ ...data, userId: session.user.id })
				.returning()
			return c.json(insertedPocket)
		},
	)
	.post(
		"/:id",
		zValidator("json", insertPocketSchema.partial(), (result, c) => {
			if (!result.success) {
				throw new HTTPException(400, { message: result.error.message })
			}
		}),
		async (c) => {
			const id = c.req.param("id")
			const data = c.req.valid("json")
			const db = c.var.DrizzleDB
			const session = c.var.session

			if (!session) {
				console.error("no session", session)
				throw new HTTPException(401, { message: "Unauthorized" })
			}

			// Check if the pocket belongs to the user using and() function
			const existingPocket = await db
				.select()
				.from(pocket)
				.where(and(eq(pocket.id, id), eq(pocket.userId, session.user.id)))
				.get()

			if (!existingPocket) {
				throw new HTTPException(404, { message: "Pocket not found or unauthorized" })
			}

			const updatedPocket = await db.update(pocket).set(data).where(eq(pocket.id, id)).returning()

			return c.json(updatedPocket[0])
		},
	)
	.delete("/:id", async (c) => {
		const id = c.req.param("id")
		const db = c.var.DrizzleDB
		const session = c.var.session

		if (!session) {
			console.error("no session", session)
			throw new HTTPException(401, { message: "Unauthorized" })
		}

		// Check if the pocket belongs to the user using and() function
		const existingPocket = await db
			.select()
			.from(pocket)
			.where(and(eq(pocket.id, id), eq(pocket.userId, session.user.id)))
			.get()

		if (!existingPocket) {
			throw new HTTPException(404, { message: "Pocket not found or unauthorized" })
		}

		await db.delete(pocket).where(eq(pocket.id, id))

		return c.json({ success: true, message: "Pocket deleted successfully" })
	})

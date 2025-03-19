import { and, eq } from "drizzle-orm"

import type { AppContext } from ".."
import { Hono } from "hono"
import { insertPocketSchema } from "../db/zod"
import { pocket } from "../db/schema"
import { zValidator } from "@hono/zod-validator"

const app = new Hono<AppContext>()
//TODO: checek if zValidators are correct or there are better ways to do it

app.get("/", async (c) => {
	const db = c.var.DrizzleDB

	const session = c.var.session
	if (!session) {
		console.error("no session", session)
		return c.json({ error: "Unauthorized" }, 401)
	}

	return c.json(await db?.select().from(pocket).where(eq(pocket.userId, session.user.id)))
})

app.post(
	"/",
	zValidator("json", insertPocketSchema, (result, c) => {
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
		const insertedPocket = await db.insert(pocket).values(data).returning()
		return c.json(insertedPocket)
	},
)

// TODO: Check if put or post for update
app.put(
	"/:id",
	zValidator("json", insertPocketSchema, (result, c) => {
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

		// Check if the pocket belongs to the user using and() function
		const existingPocket = await db
			.select()
			.from(pocket)
			.where(and(eq(pocket.id, id), eq(pocket.userId, session.user.id)))
			.get()

		if (!existingPocket) {
			return c.json({ error: "Pocket not found or unauthorized" }, 404)
		}

		const updatedPocket = await db.update(pocket).set(data).where(eq(pocket.id, id)).returning()

		return c.json(updatedPocket)
	},
)

// Delete endpoint
app.delete("/:id", async (c) => {
	const id = c.req.param("id")
	const db = c.var.DrizzleDB
	const session = c.var.session

	if (!session) {
		console.error("no session", session)
		return c.json({ error: "Unauthorized" }, 401)
	}

	// Check if the pocket belongs to the user using and() function
	const existingPocket = await db
		.select()
		.from(pocket)
		.where(and(eq(pocket.id, id), eq(pocket.userId, session.user.id)))
		.get()

	if (!existingPocket) {
		return c.json({ error: "Pocket not found or unauthorized" }, 404)
	}

	await db.delete(pocket).where(eq(pocket.id, id))

	return c.json({ success: true, message: "Pocket deleted successfully" })
})

export const pocketsRoute = app

import type { AppContext } from ".."
import { Hono } from "hono"
import { eq } from "drizzle-orm"
import { insertPocketSchema } from "../db/zod"
import { pocket } from "../db/schema"
import { zValidator } from "@hono/zod-validator"

const app = new Hono<AppContext>()

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

export const pocketsRoute = app

import type { AppContext } from ".."
import { Hono } from "hono"
import { eq } from "drizzle-orm"
import { pocket } from "../db/schema"

const app = new Hono<AppContext>()
//TODO: add session to the context before the route
app.get("/", async (c) => {
	const db = c.var.DrizzleDB
	// const session = await c.var.auth.api.getSession({ headers: c.req.raw.headers })
	const session = c.var.session
	if (!session) {
		console.error("no session", session)
		return c.json({ error: "Unauthorized" }, 401)
	}

	return c.json(await db?.select().from(pocket).where(eq(pocket.userId, session.user.id)))
})

export const pocketsRoute = app

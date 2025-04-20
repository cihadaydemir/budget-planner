import type { AppContext } from ".."
import { createDb } from "../db"
import { createMiddleware } from "hono/factory"
import { getAuth } from "../lib/auth/auth"

export const contextMiddleware = createMiddleware<AppContext>(async (c, next) => {
	c.set("DrizzleDB", createDb(c.env.DB))

	c.set(
		"auth",
		getAuth({
			BETTER_AUTH_SECRET: c.env.BETTER_AUTH_SECRET,
			API_BASE_URL: c.env.API_BASE_URL,
			drizzleDB: c.get("DrizzleDB"),
			CLIENT_BASE_URL: c.env.CLIENT_BASE_URL,
			GITHUB_CLIENT_ID: c.env.GITHUB_CLIENT_ID,
			GITHUB_CLIENT_SECRET: c.env.GITHUB_CLIENT_SECRET,
			GOOGLE_CLIENT_ID: c.env.GOOGLE_CLIENT_ID,
			GOOGLE_CLIENT_SECRET: c.env.GOOGLE_CLIENT_SECRET,
			kvStore: c.env["budget-planner-sesssion"],
		}),
	)

	const session = await c.get("auth").api.getSession({ headers: c.req.raw.headers })

	if (!session) {
		c.set("session", null)
		return next()
	}
	c.set("session", session)
	await next()
})

import type { Session, getAuth } from "./lib/auth/auth"

import type { DrizzleDB } from "./db"
import { Hono } from "hono"
import { contextMiddleware } from "../middleware/context-middleware"
import { cors } from "hono/cors"
import { pocketsRoute } from "./routes/pockets"
import { transactionsRoute } from "./routes/transactions"

type Variables = {
	DrizzleDB: DrizzleDB
	auth: ReturnType<typeof getAuth>
	session: Session | null
}

export type AppContext = {
	Bindings: Env
	Variables: Variables
}

const app = new Hono<AppContext>()

app.use(
	"*",
	cors({
		origin: "http://localhost:3001",
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
)

// DB and Auth middleware
app.use("*", contextMiddleware)

app.on(["POST", "GET"], "/api/auth/**", async (c) => {
	return c
		.get("auth")
		.handler(c.req.raw)
		.then(async (res) => {
			// c.var.auth.api.getSession

			return res
		})
		.catch((err) => {
			return c.json({ error: "Unauthorized access" }, 401)
		})
})

const routes = app.route("/pockets", pocketsRoute).route("/transactions", transactionsRoute)

app.get("/", async (c) => {
	return c.text("Budget Planner Hono v1 🔥")
})

export default {
	port: 3000,
	fetch: app.fetch,
}

export type AppType = typeof routes

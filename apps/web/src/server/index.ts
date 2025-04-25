import type { Session, getAuth } from "./lib/auth/auth"

import type { DrizzleDB } from "./db"
import { Hono } from "hono"
import { instrument, type ResolveConfigFn } from "@microlabs/otel-cf-workers"

import { cors } from "hono/cors"
import { currenyRateRoutes } from "./routes/currency-rates"
import { pocketsRoute } from "./routes/pockets"
import { transactionsRoute } from "./routes/transactions"
import { contextMiddleware } from "./middleware/context-middleware"

type Variables = {
	DrizzleDB: DrizzleDB
	auth: ReturnType<typeof getAuth>
	session: Session | null
}

export type AppContext = {
	Bindings: Env
	Variables: Variables
}

const app = new Hono<AppContext>().basePath("/api")

app.use("*", async (c, next) => {
	const corsMiddlewareHandler = cors({
		origin: [c.env.CLIENT_BASE_URL],
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		maxAge: 600,
		credentials: true,
	})
	return corsMiddlewareHandler(c, next)
})

// DB and Auth middleware
app.use("*", contextMiddleware)

app.on(["POST", "GET"], "/auth/**", async (c) => {
	return c
		.get("auth")
		.handler(c.req.raw)
		.catch((err) => {
			return c.json({ error: "Unauthorized access" }, 401)
		})
})

const routes = app
	.route("/pockets", pocketsRoute)
	.route("/transactions", transactionsRoute)
	.route("/currencies", currenyRateRoutes)

app.onError((error, c) => {
	console.error(error)
	return c.json({ error: `Internal Server Error: ${error.message}` }, 500)
})

const handler = {
	port: 3000,
	fetch: app.fetch,
}

const config: ResolveConfigFn = (env: Env, _trigger) => {
	return {
		exporter: {
			url: "https://api.axiom.co/v1/traces",
			headers: {
				Authorization: `Bearer ${env.AXIOM_API_TOKEN}`,
				"X-Axiom-Dataset": "budget-planner",
			},
		},
		service: { name: "axiom-cloudflare-workers" },
	}
}

export default instrument(handler, config)
export type AppType = typeof routes

import cors from "@elysiajs/cors";
import { Elysia } from "elysia";

import betterAuthView from "./lib/auth/auth-view";
import { pocketsRoute } from "./routes/pockets";
import { transactionsRoute } from "./routes/transactions";

const app = new Elysia()
	.use(
		cors({
			origin: "http://localhost:3001",
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.all("/api/auth/*", betterAuthView)
	.use(pocketsRoute)
	.use(transactionsRoute)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;

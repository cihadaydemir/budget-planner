import { Elysia } from "elysia";
import { pocketsRoute } from "./routes/pockets";
import cors from "@elysiajs/cors";
import { transactionsRoute } from "./routes/transactions";
import betterAuthView from "./lib/auth/auth-view";

const app = new Elysia()
	.use(cors())
	.all("/api/auth/*", betterAuthView)
	.use(pocketsRoute)
	.use(transactionsRoute)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;

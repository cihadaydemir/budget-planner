import cors from "@elysiajs/cors";
import Elysia from "elysia";
import betterAuthView from "./lib/auth/auth-view";
import { pocketsRoute } from "./routes/pockets";
import { transactionsRoute } from "./routes/transactions";

export const app = new Elysia({ aot: false })
	.onError(({ code, error }) => {
		console.log(code);
		return new Response(JSON.stringify({ error: error.toString() ?? code }), {
			status: 500,
		});
	})
	.use(
		cors({
			origin: process.env.CLIENT_BASE_URL as string,
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.all("/api/auth/*", betterAuthView)
	.use(pocketsRoute)
	.use(transactionsRoute)
	.get("/", () => "Budget-Planner-API v1");
// .listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;

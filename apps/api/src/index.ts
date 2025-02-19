import { Elysia } from "elysia";
import { pocketsRoute } from "./routes/pockets";
import cors from "@elysiajs/cors";

const app = new Elysia().use(cors()).use(pocketsRoute).listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;

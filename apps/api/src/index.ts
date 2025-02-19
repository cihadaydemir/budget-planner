import { Elysia } from "elysia";
import { pocketsRoute } from "./routes/pockets";

const app = new Elysia().use(pocketsRoute).listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;

import { Elysia, t } from "elysia";
import { insertPocketSchema, pocketSchema } from "./db/schema";
import { db } from "./db";

const app = new Elysia()
	.get("/", () => "Hello Elysia")
	.post(
		"/pocket",
		async ({ body }) => {
			return await db.insert(pocketSchema).values(body).returning();
		},
		{
			body: t.Omit(insertPocketSchema, ["id"]),
		},
	)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

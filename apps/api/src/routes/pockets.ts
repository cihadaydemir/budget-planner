import Elysia, { t } from "elysia";
import { schemas } from "../db/model";
import { db } from "../db";
import { pocketSchema, table } from "../db/schema";
import { eq } from "drizzle-orm";
import { insertPocketSchema } from "../db/types";

const { pocket } = schemas.insert;

export const pocketsRoute = new Elysia({ prefix: "/pockets" })
	.get("", async () => {
		return await db.select().from(pocketSchema);
	})
	.post(
		"/create",
		async ({ body }) => {
			console.log("triggered", body);
			return await db.insert(pocketSchema).values(body).returning();
		},
		{
			body: insertPocketSchema,
		},
	)
	.delete("/:id", async ({ params }) => {
		return await db
			.delete(pocketSchema)
			.where(eq(pocketSchema.id, params.id))
			.returning();
	});

import Elysia from "elysia";
import { db } from "../db";
import { table } from "../db/schema";
import { eq } from "drizzle-orm";
import { insertPocketSchema, insertTransactionSchema } from "../db/types";

export const transactionsRoute = new Elysia({ prefix: "/transactions" })
	.get("/:pocketId", async ({ params }) => {
		return await db
			.select()
			.from(table.transactionSchema)
			.where(eq(table.transactionSchema.pocketId, params.pocketId))
			.orderBy(table.transactionSchema.createdAt);
	})
	.post(
		"",
		async ({ body }) => {
			return await db.insert(table.transactionSchema).values(body).returning();
		},
		{
			body: insertTransactionSchema,
		},
	)
	.delete("/:transactionId", async ({ params }) => {
		return await db
			.delete(table.transactionSchema)
			.where(eq(table.transactionSchema.id, params.transactionId))
			.returning();
	});

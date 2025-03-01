import Elysia, { error, t } from "elysia";
import { db } from "../db";
import { table } from "../db/schema";
import { eq } from "drizzle-orm";
import { insertTransactionSchema } from "../db/types";

export const transactionsRoute = new Elysia({ prefix: "/transactions" })
	.get("/pocket/:pocketId", async ({ params }) => {
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
	.post(
		"/edit/:transactionId",
		async ({ params, body }) => {
			if (!params.transactionId) {
				return error(500, "transactionId is required");
			}
			// TODO check also user id
			const transaction = await db
				.select()
				.from(table.transactionSchema)
				.where(eq(table.transactionSchema.id, params.transactionId));
			if (transaction.length === 1) {
				return await db
					.update(table.transactionSchema)
					.set({
						...body,
						updatedAt: new Date().toDateString(),
					})
					.returning();
			}
		},
		{
			body: t.Partial(insertTransactionSchema),
		},
	)
	.delete("/:transactionId", async ({ params }) => {
		return await db
			.delete(table.transactionSchema)
			.where(eq(table.transactionSchema.id, params.transactionId))
			.returning();
	});

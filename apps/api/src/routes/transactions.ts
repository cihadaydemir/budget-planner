import Elysia, { error, t } from "elysia";
import { and, desc, eq } from "drizzle-orm";

import { authMiddleware } from "../middlewares/auth-middleware";
import { drizzle } from "drizzle-orm/d1";
import { getDB } from "../storage";
import { insertTransactionSchema } from "../db/types";
import { table } from "../db/schema";

export const transactionsRoute = new Elysia({
	prefix: "/transactions",
})
	// .use(dbPlugin)
	.use(authMiddleware)
	.get("/pocket/:pocketId", async ({ params, user }) => {
		const db = getDB();

		return await db
			.select()
			.from(table.transactionSchema)
			.where(
				and(eq(table.transactionSchema.pocketId, params.pocketId), eq(table.transactionSchema.userId, user.id)),
			)
			.orderBy(desc(table.transactionSchema.createdAt));
	})
	.post(
		"",
		async ({ body, user }) => {
			const db = getDB();

			return await db
				.insert(table.transactionSchema)
				.values({ ...body, userId: user.id })
				.returning();
		},
		{
			body: insertTransactionSchema,
		},
	)
	.post(
		"/edit/:transactionId",
		async ({ params, body, user }) => {
			if (!params.transactionId) {
				return error(500, "transactionId is required");
			}
			const db = getDB();

			return await db
				.update(table.transactionSchema)
				.set({
					...body,
					updatedAt: new Date().toDateString(),
				})
				.where(
					and(
						eq(table.transactionSchema.id, params.transactionId),
						eq(table.transactionSchema.userId, user.id),
					),
				)
				.returning();
		},
		{
			body: t.Partial(insertTransactionSchema),
		},
	)
	.delete("/:transactionId", async ({ params, user }) => {
		const db = getDB();

		return await db
			.delete(table.transactionSchema)
			.where(
				and(eq(table.transactionSchema.id, params.transactionId), eq(table.transactionSchema.userId, user.id)),
			)
			.returning();
	});

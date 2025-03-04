import Elysia, { error, t } from "elysia";
import { db } from "../db";
import { table } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { insertTransactionSchema } from "../db/types";
import { desc } from "drizzle-orm";
import { authMiddleware } from "../middlewares/auth-middleware";

export const transactionsRoute = new Elysia({ prefix: "/transactions" })
	.use(authMiddleware)
	.get("/pocket/:pocketId", async ({ params, user }) => {
		return await db
			.select()
			.from(table.transactionSchema)
			.where(
				and(
					eq(table.transactionSchema.pocketId, params.pocketId),
					eq(table.transactionSchema.userId, user.id),
				),
			)
			.orderBy(desc(table.transactionSchema.createdAt));
	})
	.post(
		"",
		async ({ body, user }) => {
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
		return await db
			.delete(table.transactionSchema)
			.where(
				and(
					eq(table.transactionSchema.id, params.transactionId),
					eq(table.transactionSchema.userId, user.id),
				),
			)
			.returning();
	});

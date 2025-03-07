import { and, eq } from "drizzle-orm";
import Elysia, { error, t } from "elysia";
import { db } from "../db";
import { pocketSchema, table } from "../db/schema";
import { insertPocketSchema } from "../db/types";
import { authMiddleware } from "../middlewares/auth-middleware";

export const pocketsRoute = new Elysia({ prefix: "/pockets" })
	.use(authMiddleware)
	.get("", async ({ user }) => {
		const pocket = await db
			.select()
			.from(pocketSchema)
			.where(eq(pocketSchema.userId, user.id));
		const responseObject = pocket.map(async (pocket) => {
			const transactions = await db
				.select()
				.from(table.transactionSchema)
				.where(eq(table.transactionSchema.pocketId, pocket.id));
			const totalSpent = transactions.reduce((acc, transaction) => {
				return acc + transaction.amount;
			}, 0);
			return {
				...pocket,
				totalSpent,
			};
		});

		return await Promise.all(responseObject);
	})
	.post(
		"/create",
		async ({ body, user }) => {
			return await db
				.insert(pocketSchema)
				.values({ ...body, userId: user?.id })
				.returning();
		},
		{
			body: insertPocketSchema,
		},
	)
	.post(
		"/edit/:pocketId",
		async ({ body, params, user }) => {
			if (!params.pocketId) {
				return error(500, "pocketId is required");
			}

			return await db
				.update(pocketSchema)
				.set({ ...body })
				.where(
					and(
						eq(pocketSchema.id, params.pocketId),
						eq(pocketSchema.userId, user?.id),
					),
				)
				.returning();
		},
		{
			body: t.Partial(insertPocketSchema),
		},
	)
	.delete("/:id", async ({ params, user }) => {
		return await db
			.delete(pocketSchema)
			.where(
				and(eq(pocketSchema.id, params.id), eq(pocketSchema.userId, user?.id)),
			)
			.returning();
	});

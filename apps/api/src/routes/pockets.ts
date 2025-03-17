import Elysia, { error, t } from "elysia";
import { and, eq } from "drizzle-orm";
import { pocketSchema, table } from "../db/schema";

import { authMiddleware } from "../middlewares/auth-middleware";
import { drizzle } from "drizzle-orm/d1";
import { getDB } from "../storage";
import { insertPocketSchema } from "../db/types";

export const pocketsRoute = new Elysia({ prefix: "/pockets" })
	.use(authMiddleware)
	.get("", async ({ user }) => {
		const db = getDB();
		const pocket = await db.select().from(pocketSchema).where(eq(pocketSchema.userId, user.id));
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
			const db = drizzle(process.env.DB as unknown as D1Database);

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
			const db = getDB();

			return await db
				.update(pocketSchema)
				.set({ ...body })
				.where(and(eq(pocketSchema.id, params.pocketId), eq(pocketSchema.userId, user?.id)))
				.returning();
		},
		{
			body: t.Partial(insertPocketSchema),
		},
	)
	.delete("/:id", async ({ params, user }) => {
		const db = getDB();

		return await db
			.delete(pocketSchema)
			.where(and(eq(pocketSchema.id, params.id), eq(pocketSchema.userId, user?.id)))
			.returning();
	});

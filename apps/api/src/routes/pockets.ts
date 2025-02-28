import Elysia, { error, t } from "elysia";
import { schemas } from "../db/model";
import { db } from "../db";
import { pocketSchema, table } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { insertPocketSchema } from "../db/types";
import { auth } from "../lib/auth/auth";

const { pocket } = schemas.insert;

export const pocketsRoute = new Elysia({ prefix: "/pockets" })
	.macro({
		auth: {
			async resolve({ error, request: { headers } }) {
				const session = await auth.api.getSession({
					headers,
				});

				if (!session) return error(401);

				return {
					user: session.user,
					session: session.session,
				};
			},
		},
	})
	.get("", async () => {
		const pockets = await db.select().from(pocketSchema);

		return await db.select().from(pocketSchema);
	})
	.post(
		"/create",
		async ({ body }) => {
			return await db.insert(pocketSchema).values(body).returning();
		},
		{
			body: insertPocketSchema,
		},
	)
	.post(
		"/edit/:pocketId",
		async ({ body, params }) => {
			if (!params.pocketId) {
				return error(500, "pocketId is required");
			}
			// TODO check for users id
			const pocket = await db
				.select()
				.from(pocketSchema)
				.where(eq(pocketSchema.id, params.pocketId));
			if (pocket.length === 1) {
				return await db
					.update(pocketSchema)
					.set({ ...body })
					.returning();
			}
		},
		{
			body: t.Partial(insertPocketSchema),
		},
	)
	.delete("/:id", async ({ params }) => {
		return await db
			.delete(pocketSchema)
			.where(eq(pocketSchema.id, params.id))
			.returning();
	});

import { createInsertSchema } from "drizzle-typebox";
import { t, type Static } from "elysia";
import { table } from "../schema";

export const insertPocketSchema = createInsertSchema(table.pocketSchema, {
	description: t.Optional(t.String()),
});

export type CreatePocketSchemaType = Omit<
	Static<typeof insertPocketSchema>,
	"id"
>;

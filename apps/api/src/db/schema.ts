import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { newId } from "../utils/id";

export const pocketSchema = sqliteTable("pockets", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => newId("pocket"))
		.notNull()
		.unique(),
	name: text("name").notNull(),
	description: text("description"),
	budget: integer("budget").notNull(),
});

export const table = {
	pocketSchema,
} as const;

export type Table = typeof table;

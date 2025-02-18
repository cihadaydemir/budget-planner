import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { newId } from "../utils/id";
import { createInsertSchema } from "drizzle-typebox";

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

export const insertPocketSchema = createInsertSchema(pocketSchema);

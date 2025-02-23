import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { type IdPrefix, newId } from "../utils/id";
import { sql } from "drizzle-orm";

export const defaultFields = (idPrefix: IdPrefix) => ({
	serialId: integer("serial_id").primaryKey({ autoIncrement: true }),
	id: text("id", { length: 21 })
		.$defaultFn(() => newId(idPrefix))
		.notNull()
		.unique(),

	createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
	deletedAt: text("deleted_at"),
});

export const pocketSchema = sqliteTable("pockets", {
	...defaultFields("pocket"),
	name: text("name").notNull(),
	description: text("description"),
	budget: integer("budget"),
});

export const transactionSchema = sqliteTable("transactions", {
	...defaultFields("transaction"),
	name: text("name").notNull(),
	description: text("description"),
	amount: integer("amount").notNull(),
	isPaid: integer("is_paid", { mode: "boolean" }).notNull().default(false),
	pocketId: text("pocket_id")
		.notNull()
		.references(() => pocketSchema.id),
});

export const table = {
	pocketSchema,
	transactionSchema,
} as const;

export type Table = typeof table;

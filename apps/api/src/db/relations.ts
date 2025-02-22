import { relations } from "drizzle-orm";
import { table } from "./schema";

export const pocketRelations = relations(table.pocketSchema, ({ many }) => ({
	transactions: many(table.transactionSchema),
}));

export const transactionRelations = relations(
	table.transactionSchema,
	({ one }) => ({
		pocket: one(table.pocketSchema, {
			fields: [table.transactionSchema.pocketId],
			references: [table.pocketSchema.id],
		}),
	}),
);

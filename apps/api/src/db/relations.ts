import { relations } from "drizzle-orm";
import { table } from "./schema";

export const pocketRelations = relations(table.pocketSchema, ({ many, one }) => ({
	transactions: many(table.transactionSchema),
	userId: one(table.user, {
		fields: [table.pocketSchema.userId],
		references: [table.user.id],
	}),
}));

export const transactionRelations = relations(table.transactionSchema, ({ one }) => ({
	pocket: one(table.pocketSchema, {
		fields: [table.transactionSchema.pocketId],
		references: [table.pocketSchema.id],
	}),
	category: one(table.expenseCategorySchema, {
		fields: [table.transactionSchema.categoryId],
		references: [table.expenseCategorySchema.id],
	}),
	userId: one(table.user, {
		fields: [table.transactionSchema.userId],
		references: [table.user.id],
	}),
}));

export const categoryRelations = relations(table.expenseCategorySchema, ({ many }) => ({
	transactions: many(table.transactionSchema),
}));

export const userRelations = relations(table.user, ({ many }) => ({
	pockets: many(table.pocketSchema),
	transactions: many(table.transactionSchema),
}));

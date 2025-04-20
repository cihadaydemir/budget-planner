import { expenseCategory, pocket, transaction, user } from "./schema"

import { relations } from "drizzle-orm"

export const pocketRelations = relations(pocket, ({ many, one }) => ({
	transactions: many(transaction),
	userId: one(user, {
		fields: [pocket.userId],
		references: [user.id],
	}),
}))

export const transactionRelations = relations(transaction, ({ one }) => ({
	pocket: one(pocket, {
		fields: [transaction.pocketId],
		references: [pocket.id],
	}),
	category: one(expenseCategory, {
		fields: [transaction.categoryId],
		references: [expenseCategory.id],
	}),
	userId: one(user, {
		fields: [transaction.userId],
		references: [user.id],
	}),
}))

export const categoryRelations = relations(expenseCategory, ({ many }) => ({
	transactions: many(transaction),
}))

export const userRelations = relations(user, ({ many }) => ({
	pockets: many(pocket),
	transactions: many(transaction),
}))

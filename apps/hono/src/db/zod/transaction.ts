import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { transaction } from "../schema"
import { z } from "zod"

export const insertTransactionSchema = createInsertSchema(transaction, {
	amount: z.number().int().min(1, { message: "Amount must be greater than 0" }),
	description: z.string().optional(),
}).omit({
	id: true,
	serialId: true,
	userId: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
})

export type InsertTransactionSchemaType = z.infer<typeof insertTransactionSchema>

export const selectTransactionSchema = createSelectSchema(transaction).omit({ serialId: true })

export type Transaction = z.infer<typeof selectTransactionSchema>

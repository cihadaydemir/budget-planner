import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { transaction } from "../schema"
import type { z } from "zod"

export const insertTransactionSchema = createInsertSchema(transaction).omit({
	id: true,
	serialId: true,
	userId: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
})

export const selectTransactionSchema = createSelectSchema(transaction).omit({ serialId: true })

export type Transaction = z.infer<typeof selectTransactionSchema>

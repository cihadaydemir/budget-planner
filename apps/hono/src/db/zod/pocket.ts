import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { pocket } from "../schema"
import { z } from "zod"

export const insertPocketSchema = createInsertSchema(pocket, {
	budget: z.number().min(1).optional(),
	description: z.string().optional(),
}).omit({
	id: true,
	serialId: true,
	userId: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
})
export const selectPocketSchema = createSelectSchema(pocket).omit({ serialId: true })
export type InsertPocketSchemaType = z.infer<typeof insertPocketSchema>
export type Pocket = z.infer<typeof selectPocketSchema>

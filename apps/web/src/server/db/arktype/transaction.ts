import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-arktype"
import { transaction } from "../schema"

export const insertTransactionSchema = createInsertSchema(transaction).omit(
	"id",
	"serialId",
	"userId",
	"createdAt",
	"updatedAt",
	"deletedAt",
)

export const updateTransactionSchema = createUpdateSchema(transaction).omit(
	"id",
	"serialId",
	"userId",
	"createdAt",
	"updatedAt",
	"deletedAt",
)

export const selectTransactionSchema = createSelectSchema(transaction).omit("serialId")

export type Transaction = typeof selectTransactionSchema.infer
export type InsertTransactionSchemaType = typeof insertTransactionSchema.infer

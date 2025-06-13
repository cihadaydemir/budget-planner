import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-arktype"
import { type } from "arktype"
import { pocket } from "../schema"

export const insertPocketSchema = createInsertSchema(pocket, {
	budget: type("number>=1|undefined"),
	description: type("string|undefined"),
}).omit(
	"id",
	"serialId",
	"userId",
	"createdAt",
	"updatedAt",
	"deletedAt",
)

export const updatePocketSchema = createUpdateSchema(pocket).omit(
	"id",
	"serialId",
	"userId",
	"createdAt",
	"updatedAt",
	"deletedAt",
)

export const selectPocketSchema = createSelectSchema(pocket).omit("serialId")

export type InsertPocketSchemaType = typeof insertPocketSchema.infer
export type Pocket = typeof selectPocketSchema.infer
export type ExtendedPocket = Pocket & { totalSpent: number }

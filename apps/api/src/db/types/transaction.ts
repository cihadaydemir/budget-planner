import { createInsertSchema } from "drizzle-typebox";
import { type Static, t } from "elysia";
import { table } from "../schema";
import { schemas } from "../model";

const { transaction: insertTransaction } = schemas.insert;

export const insertTransactionSchema = t.Object(
	{
		name: insertTransaction.name,
		description: t.Optional(t.String()),
		amount: insertTransaction.amount,
		pocketId: insertTransaction.pocketId,
	},
	{
		amount: t.Integer({
			minimum: 1,
			errorMessage: "Amount must be greater than 0",
		}),
	},
);
export type CreateTransactionSchemaType = Static<
	typeof insertTransactionSchema
>;

const { transaction } = schemas.select;

export const selectTransactionSchema = t.Omit(t.Object({ ...transaction }), [
	"serialId",
]);

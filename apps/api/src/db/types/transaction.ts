import { t, type Static } from "elysia";
import { schemas } from "../model";

const { transaction: insertTransaction } = schemas.insert;

export const insertTransactionSchema = t.Object(
	{
		id: insertTransaction.id,
		name: insertTransaction.name,
		description: t.Optional(t.String()),
		amount: insertTransaction.amount,
		isPaid: t.Boolean(),
		pocketId: insertTransaction.pocketId,
	},
	{
		amount: t.Integer({
			minimum: 1,
			errorMessage: "Amount must be greater than 0",
		}),
	},
);
export type InsertTransactionSchemaType = Static<typeof insertTransactionSchema>;

const { transaction } = schemas.select;

export const selectTransactionSchema = t.Omit(t.Object({ ...transaction }), ["serialId"]);

export type Transaction = Static<typeof selectTransactionSchema>;

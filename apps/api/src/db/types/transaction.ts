import { type Static, t } from "elysia";
import { schemas } from "../model";

const { transaction: insertTransaction } = schemas.insert;

export const insertTransactionSchema = t.Object(
	{
		name: insertTransaction.name,
		description: t.Optional(t.String()),
		amount: insertTransaction.amount,
		isPaid: t.Boolean(),
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
> & { pocketId: string };

const { transaction } = schemas.select;

export const selectTransactionSchema = t.Omit(t.Object({ ...transaction }), [
	"serialId",
]);

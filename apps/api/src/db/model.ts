import { table } from "./schema";
import { spreads } from "./utils";

export const schemas = {
	insert: spreads(
		{
			pocket: table.pocketSchema,
			transaction: table.transactionSchema,
		},
		"insert",
	),
	select: spreads(
		{
			pocket: table.pocketSchema,
			transaction: table.transactionSchema,
		},
		"select",
	),
} as const;

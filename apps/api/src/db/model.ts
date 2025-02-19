import { table } from "./schema";
import { spreads } from "./utils";

export const schemas = {
	insert: spreads(
		{
			pocket: table.pocketSchema,
		},
		"insert",
	),
	select: spreads(
		{
			pocket: table.pocketSchema,
		},
		"select",
	),
} as const;

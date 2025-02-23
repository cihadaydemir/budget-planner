import { t, type Static } from "elysia";
import { schemas } from "../model";

const { pocket: insertPocket } = schemas.insert;

export const insertPocketSchema = t.Object({
	name: insertPocket.name,
	description: t.Optional(t.String()),
	budget: t.Optional(t.Integer()),
});

export type CreatePocketSchemaType = Omit<
	Static<typeof insertPocketSchema>,
	"id"
>;

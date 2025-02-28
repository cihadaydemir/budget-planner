import { t, type Static } from "elysia";
import { schemas } from "../model";

const { pocket: insertPocket } = schemas.insert;
const { pocket: selectPocket } = schemas.select;

export const insertPocketSchema = t.Object({
	id: insertPocket.id,
	name: insertPocket.name,
	description: t.Optional(t.String()),
	budget: t.Optional(t.Integer()),
});

export type InsertPocketSchemaType = Static<typeof insertPocketSchema>;

export const selectPocketSchema = t.Object({
	...selectPocket,
});

export type Pocket = Omit<Static<typeof selectPocketSchema>, "serialId">;

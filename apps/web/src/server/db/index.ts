import * as schema from "./schema"

import { type DrizzleD1Database, drizzle } from "drizzle-orm/d1"

export type DrizzleDB = DrizzleD1Database<typeof schema>

export function createDb(DB: Env["DB"]) {
	return drizzle(DB, {
		schema: {
			...schema,
		},
	})
}

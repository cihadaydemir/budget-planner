import { Elysia } from "elysia";

import { app } from "./app";
import { asyncLocalStorage, getEnv } from "./storage";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./db/schema";
declare global {
	var env: Env;
	var db: D1Database;
}

export { getEnv };

export default {
	async fetch(request: Request, env: Env, ctx): Promise<Response> {
		Object.assign(globalThis, {
			env,
		});

		Object.assign(process, {
			env: { ...env, DB: env.DB },
		});
		const db = drizzle(env.DB, { schema });
		return asyncLocalStorage.run({ env, db }, async () => {
			const resp = await new Elysia({ aot: false }).use(app).handle(request);
			return resp;
		});
	},
} satisfies ExportedHandler<Env>;

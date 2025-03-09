import type { Context } from "elysia";

import { app } from "./app";

declare global {
	var env: Env;
}

export default {
	async fetch(request: Request, env: Env, ctx: Context): Promise<Response> {
		Object.assign(globalThis, {
			env,
		});

		Object.assign(process, {
			env: { ...env, DATABASE_URL: env.devDB },
		});

		return await app.fetch(request);
	},
} satisfies ExportedHandler<Env>;

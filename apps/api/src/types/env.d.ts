import type { D1Database } from "@cloudflare/workers-types";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DB: D1Database;
			BETTER_AUTH_URL: string;
			CLIENT_BASE_URL: string;
			GITHUB_CLIENT_ID: string;
			GITHUB_CLIENT_SECRET: string;
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
		}
	}
}

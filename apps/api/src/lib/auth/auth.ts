import { account, session, user, verification } from "../../db/schema";

import { DrizzleD1Database } from "drizzle-orm/d1";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
	appName: "Budget-Planner",
	database: drizzleAdapter(DrizzleD1Database, {
		provider: "sqlite",
		schema: {
			user,
			session,
			verification,
			account,
		},
	}),
	trustedOrigins: [process.env.CLIENT_BASE_URL as string],
	emailAndPassword: {
		enabled: true, // If you want to use email and password auth
	},
	socialProviders: {
		/*
		 * We're using Google and Github as our social provider,
		 * make sure you have set your environment variables
		 */
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	advanced: {
		crossSubDomainCookies: {
			enabled: true,
		},
	},
});

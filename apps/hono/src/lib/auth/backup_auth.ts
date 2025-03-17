import { account, session, user, verification } from "../../db/schema";

import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const createBetterAuthConfig = (env: Env) =>
	({
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
		trustedOrigins: [env.CLIENT_BASE_URL as string],
		emailAndPassword: {
			enabled: true, // If you want to use email and password auth
		},
		socialProviders: {
			github: {
				clientId: env.GITHUB_CLIENT_ID as string,
				clientSecret: env.GITHUB_CLIENT_SECRET as string,
			},
			// google: {
			// 	clientId: env.GOOGLE_CLIENT_ID as string,
			// 	clientSecret: env.GOOGLE_CLIENT_SECRET as string,
			// },
		},
	}) satisfies BetterAuthOptions;

export const betterAuthConfig = {
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
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
		// google: {
		// 	clientId: process.env.GOOGLE_CLIENT_ID as string,
		// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		// },
	},
};

export const auth = betterAuth(betterAuthConfig);

export const getAuthv2 = (env: Env) => {
	const db = drizzle(env.DB);

	return betterAuth({
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.API_BASE_URL,
		trustedOrigins: [env.CLIENT_BASE_URL as string],
		emailAndPassword: {
			enabled: true, // If you want to use email and password auth
		},
		database: drizzleAdapter(db, {
			provider: "sqlite",
			schema: {
				user,
				session,
				verification,
				account,
			},
		}),
		socialProviders: {
			github: {
				clientId: env.GITHUB_CLIENT_ID,
				clientSecret: env.GITHUB_CLIENT_SECRET,
			},
			google: {
				clientId: env.GOOGLE_CLIENT_ID,
				clientSecret: env.GOOGLE_CLIENT_SECRET,
			},
		},
	});
};

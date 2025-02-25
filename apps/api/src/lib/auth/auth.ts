import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../../db";
import { user, session, verification, account } from "../../db/schema";
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		// We're using Drizzle as our database
		provider: "sqlite",
		/*
		 * Map your schema into a better-auth schema
		 */
		schema: {
			user,
			session,
			verification,
			account,
		},
	}),
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
		// google: {
		// 	clientId: process.env.GOOGLE_CLIENT_ID!,
		// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		// },
	},
});

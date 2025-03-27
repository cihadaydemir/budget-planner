import * as schema from "../../db/schema"

import type { DrizzleDB } from "../../db"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

export const getAuth = ({
	BETTER_AUTH_SECRET,
	drizzleDB,
	API_BASE_URL,
	CLIENT_BASE_URL,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	kvStore,
}: {
	BETTER_AUTH_SECRET: string
	API_BASE_URL: string
	CLIENT_BASE_URL: string
	GITHUB_CLIENT_ID: string
	GITHUB_CLIENT_SECRET: string
	GOOGLE_CLIENT_ID: string
	GOOGLE_CLIENT_SECRET: string
	drizzleDB: DrizzleDB
	kvStore: KVNamespace
}) =>
	betterAuth({
		baseURL: API_BASE_URL,
		secret: BETTER_AUTH_SECRET,
		trustedOrigins: [CLIENT_BASE_URL],
		database: drizzleAdapter(drizzleDB, {
			provider: "sqlite",
			schema,
		}),
		emailAndPassword: {
			enabled: true,
		},
		socialProviders: {
			github: { enabled: true, clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET },
			google: { enabled: true, clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET },
		},
		onAPIError: {
			throw: true,
			onError: (error) => {
				// Custom error handling
				console.error("Auth error:", error)
			},
		},
		secondaryStorage: {
			delete: async (key) => await kvStore.delete(key),
			get: async (key) => {
				const val = await kvStore.get(key)
				return val ? val : null
			},
			set: async (key, value, ttl) => {
				kvStore.put(key, value, { expirationTtl: ttl })
			},
		},
		advanced: {
			crossSubDomainCookies: {
				enabled: true,
			},
			defaultCookieAttributes: {
				httpOnly: true,
				secure: true,
				sameSite: "none",
			},
		},
	})

export type Auth = ReturnType<typeof getAuth>
export type Session = Auth["$Infer"]["Session"]

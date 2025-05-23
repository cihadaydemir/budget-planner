import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
	// baseURL: import.meta.env.VITE_BETTER_AUTH_URL,
	fetchOptions: {
		credentials: "include",
		disableValidation: true,
	},
})

export type Session = typeof authClient.$Infer.Session
export type SessionData = Session["session"]

export const { useSession, signIn, signOut, signUp } = authClient

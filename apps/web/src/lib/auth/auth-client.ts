import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	fetchOptions: {
		credentials: "include",
	},
});

export type Session = typeof authClient.$Infer.Session;
export type SessionData = Session["session"];

export const { useSession, signIn, signOut, signUp } = authClient;

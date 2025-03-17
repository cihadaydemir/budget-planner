import type { Session, User } from "better-auth/types";

import { Elysia, type Context } from "elysia";
import { auth } from "../lib/auth/auth";

//TODO figure out if this is the right way to do it
export const authMiddleware = new Elysia()
	.derive({ as: "scoped" }, async (c: Context) => {
		const session = await auth.api.getSession({
			headers: c.request.headers,
		});

		if (!session) throw new Error("Unauthorized");

		return {
			user: session.user,
			session: session.session,
		};
	})
	.onError(({ error }) => {
		return new Response(error, { status: 401 }); //TODO figure out if this is the right way to do it
	});

export const userMiddleware = async (c: Context) => {
	const session = await auth.api.getSession({ headers: c.request.headers });
	console.log("session in middleware", session);
	if (!session) {
		c.set.status = 401;
		return {
			success: "error",
			message: "Unauthorized Access: Token is missing",
		};
	}

	return {
		user: session.user,
		session: session.session,
	};
};

export const userInfo = (user: User | null, session: Session | null) => {
	return {
		user: user,
		session: session,
	};
};

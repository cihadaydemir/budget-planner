import { AppContext } from "../src";
import { createDb } from "../src/db";
import { createMiddleware } from "hono/factory";
import { getAuth } from "../src/lib/auth/auth";

export const contextMiddleware = createMiddleware<AppContext>(async (c, next) => {
	c.set("DrizzleDB", createDb(c.env.DB));
	c.set(
		"auth",
		getAuth({
			BETTER_AUTH_SECRET: c.env.BETTER_AUTH_SECRET,
			BASE_BETTER_AUTH_URL: c.env.BASE_BETTER_AUTH_URL,
			drizzleDB: c.get("DrizzleDB"),
		}),
	);
	const auth = c.get("auth");
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
	if (!session) {
		return c.json("Unauthorized", 401);
	}
	c.set("session", session);
	await next();
});

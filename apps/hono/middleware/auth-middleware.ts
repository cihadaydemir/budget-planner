import { AppContext } from "../src";
import { Hono } from "hono";
import { getAuth } from "../src/lib/auth/auth";

const app = new Hono<AppContext>()


app.use("*", async (c, next) => {

    Object.assign(process, {
			env: c.env,
		})

	const auth = getAuth(c)
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
		

    if(!session) return c.body(null, 401);
 
  	c.set("user", session.user);
  	c.set("session", session.session);
  	return next();
});

export const authMiddleware = app
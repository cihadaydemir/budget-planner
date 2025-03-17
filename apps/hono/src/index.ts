import { Session, getAuth } from './lib/auth/auth';

import { DrizzleDB } from './db';
import { Hono } from 'hono';
import { contextMiddleware } from '../middleware/context-middleware';
import { cors } from 'hono/cors';
import { pocketsRoute } from './routes/pockets';

type Variables = {
  DrizzleDB: DrizzleDB;
  auth: ReturnType<typeof getAuth>;
  session: Session
};

export type AppContext = {
  Bindings: Env;
  Variables: Variables
}


const app = new Hono<AppContext>()


app.use("*",cors({
    origin:"http://localhost:3001",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
}))

// DB and Auth middleware
app.use("*",contextMiddleware);


app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return c
    .get("auth")
    .handler(c.req.raw)
    .then(async (res) => {
      const session = await c.var.auth.api.getSession({ headers: c.req.raw.headers });
      // if(!session){
      // return c.json({ error: "Unauthorized" }, 401);
      // }
      // c.set("session", session);
      return res;
    })
    .catch((err) => {
      return c.json({ error: "Unauthorized" }, 401);
    });
});

app.route("/pockets",pocketsRoute)

app.get('/', async (c) => {

  return c.text("Budget Planner Hono v1 🔥")
})


app.onError((e,c)=>{

  return c.json({error:e,header:c.req.raw.headers},500)
})

export default {  
  port: 3000, 
  fetch: app.fetch, 
} 

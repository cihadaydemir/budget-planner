import { DrizzleDB, createDb } from './db';
import { Session, getAuth } from './lib/auth/auth';

import { Hono } from 'hono';
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

// app.use("*",contextMiddleware);

app.use("*",cors({
    origin:"http://localhost:3001",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
}))

 // DB and Auth middleware
app.use("*", async (c, next) => {
  c.set("DrizzleDB", createDb(c.env.DB));
  c.set("auth", getAuth({ BETTER_AUTH_SECRET: c.env.BETTER_AUTH_SECRET, BASE_BETTER_AUTH_URL: c.env.BASE_BETTER_AUTH_URL, drizzleDB: c.get("DrizzleDB") }));
  await next();
});

app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return c
    .get("auth")
    .handler(c.req.raw)
    .then(async (res) => {
      const session = await c.var.auth.api.getSession({ headers: c.req.raw.headers });
      if(!session){
      return c.json({ error: "Unauthorized" }, 401);
      }
      c.set("session", session);
      return res;
    })
    .catch((err) => {
      return c.json({ error: "Unauthorized" }, 401);
    });
});

app.route("",pocketsRoute)
// app.on(["POST", "GET"], "/api/auth/**", (c) => {
//   try{
//     const auth = getAuth(c)
//     return auth.handler(c.req.raw);
//   }catch(e){
//     console.log("auth api error",e)
//     return c.json("Error",500)
//   }
// }).onError((e,c)=>{

//   return c.json({error:e,context:c},500)
// });

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

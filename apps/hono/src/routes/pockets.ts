import { AppContext } from "..";
import { Hono } from "hono";
import { createDb } from "../db";
import { eq } from "drizzle-orm";
import { getAuth } from "../lib/auth/auth";
import { table } from "../db/schema";

const app = new Hono<AppContext>()
app.use("*", async (c, next) => {
  c.set("DrizzleDB", createDb(c.env.DB));
  c.set("auth", getAuth({ BETTER_AUTH_SECRET: c.env.BETTER_AUTH_SECRET, BASE_BETTER_AUTH_URL: c.env.API_BASE_URL, drizzleDB: c.get("DrizzleDB") }));
  await next();
});

app.get('/pockets', async (c)=>{
    const db = c.var.DrizzleDB
    return c.json(await db?.select().from(table.pocketSchema))
})

export const pocketsRoute = app;
import { AppContext } from "..";
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { pocket } from "../db/schema";

const app = new Hono<AppContext>();

app.get("/", async (c) => {
	const db = c.var.DrizzleDB;
	return c.json(await db?.select().from(pocket).where(eq(pocket.userId, c.var.session.user.id)));
});

export const pocketsRoute = app;

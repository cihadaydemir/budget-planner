import * as schema from '../src/db/schema';

import { AppContext } from '../src';
import { Hono } from 'hono';
// src/middleware/db.ts
import { drizzle } from 'drizzle-orm/d1';

export const db = new Hono<AppContext>();

db.use('*', async (c, next) => {
  // Drizzle-Instanz erstellen und zum Context hinzufügen
  c.set('db', drizzle(c.env.DB, { schema }));
  await next();
});

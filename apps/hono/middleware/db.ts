import * as schema from '../src/db/schema';

// src/middleware/db.ts
import { DrizzleD1Database, drizzle } from 'drizzle-orm/d1';

import { AppContext } from '../src';
import { Hono } from 'hono';

export const db = new Hono<AppContext>();

db.use('*', async (c, next) => {
  // Drizzle-Instanz erstellen und zum Context hinzufügen
  c.set('db', drizzle(c.env.DB, { schema }));
  await next();
});


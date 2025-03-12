import * as schema from './db/schema';

import { DrizzleD1Database } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { db } from '../middleware/db';
import { table } from './db/schema'

export type AppContext = {
  Bindings: Env;
  Variables: {
db: DrizzleD1Database<typeof schema>;
  }
}
const app = new Hono<AppContext>()
app.route("",db)
app.get('/', async (c) => {
  const {db} = c.var
  const users = await db.select().from(table.user)
  return c.json(users)
})


export default {  
  port: 3000, 
  fetch: app.fetch, 
} 

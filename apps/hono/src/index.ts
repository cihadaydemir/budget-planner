import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { table } from './db/schema'

const app = new Hono<{Bindings: Env}>()



app.get('/', async (c) => {
  const db = drizzle(c.env.devDB)
  const users = await db.select().from(table.user)
  return c.json(users)
})

export default app

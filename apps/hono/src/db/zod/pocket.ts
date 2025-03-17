import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { pocket } from '../schema';
import { z } from 'zod';

const insertPocketSchema = createInsertSchema(pocket).omit({
	id: true,serialId:true,userId:true,createdAt:true,updatedAt:true,deletedAt:true
})
const selectPocketSchema = createSelectSchema(pocket).omit({serialId:true})
export type InsertPocketSchemaType = z.infer<typeof insertPocketSchema>;

export type Pocket = z.infer<typeof selectPocketSchema>;

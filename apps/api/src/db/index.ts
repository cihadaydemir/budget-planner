import "dotenv/config";
import { drizzle } from "drizzle-orm/d1";

export const db = drizzle(env.devDB);

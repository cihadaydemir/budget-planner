import type * as schema from "./db/schema";

import { AsyncLocalStorage } from "node:async_hooks";
import type { DrizzleD1Database } from "drizzle-orm/d1";

// Define a store type for our AsyncLocalStorage
export type Store = {
	env: Env;
	db: DrizzleD1Database<typeof schema> & {
		$client: D1Database;
	};
};

export const asyncLocalStorage = new AsyncLocalStorage<Store>();

export function getEnv(): Env {
	const store = asyncLocalStorage.getStore();
	if (!store) {
		throw new Error("Environment not initialized. Must be called within request context.");
	}
	return store.env;
}
export function getDB() {
	const store = asyncLocalStorage.getStore();
	if (!store) {
		throw new Error("Environment not initialized. Must be called within request context.");
	}
	return store.db;
}

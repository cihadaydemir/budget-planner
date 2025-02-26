import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { type IdPrefix, newId } from "../utils/id";
import { sql } from "drizzle-orm";

export const defaultFields = (idPrefix: IdPrefix) => ({
	serialId: integer("serial_id").primaryKey({ autoIncrement: true }),
	id: text("id", { length: 21 })
		.$defaultFn(() => newId(idPrefix))
		.notNull()
		.unique(),

	createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
	deletedAt: text("deleted_at"),
});

export const pocketSchema = sqliteTable("pockets", {
	...defaultFields("pocket"),
	name: text("name").notNull(),
	description: text("description"),
	budget: integer("budget"),
	userId: text("user_id").references(() => user.id),
});

export const transactionSchema = sqliteTable("transactions", {
	...defaultFields("transaction"),
	name: text("name").notNull(),
	description: text("description"),
	amount: integer("amount").notNull(),
	isPaid: integer("is_paid", { mode: "boolean" }).notNull().default(false),
	pocketId: text("pocket_id")
		.notNull()
		.references(() => pocketSchema.id),
	userId: text("user_id").references(() => user.id),
});

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
	image: text("image"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
	id: text("id").primaryKey(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	token: text("token").notNull().unique(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: integer("access_token_expires_at", {
		mode: "timestamp",
	}),
	refreshTokenExpiresAt: integer("refresh_token_expires_at", {
		mode: "timestamp",
	}),
	scope: text("scope"),
	password: text("password"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }),
	updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const table = {
	pocketSchema,
	transactionSchema,
	user,
	session,
	verification,
	account,
} as const;

export type Table = typeof table;

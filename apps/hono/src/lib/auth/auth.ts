import * as schema from "../../db/schema";

import { DrizzleDB } from "../../db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const getAuth = ({ BETTER_AUTH_SECRET, drizzleDB, BASE_BETTER_AUTH_URL }: { BETTER_AUTH_SECRET: string; BASE_BETTER_AUTH_URL: string; drizzleDB: DrizzleDB }) =>
  betterAuth({
    baseURL: BASE_BETTER_AUTH_URL,
    secret: BETTER_AUTH_SECRET,
    trustedOrigins: ["http://localhost:3001/"],
    database: drizzleAdapter(drizzleDB, {
      provider: "sqlite",
      schema,
    }),
    emailAndPassword: {
      enabled: true,
    },
    onAPIError: {
      throw: true,
      onError: (error, ctx) => {
        // Custom error handling
        console.error("Auth error:", error);
      },
    },
    advanced: {
      crossSubDomainCookies: {
        enabled: true,
      },
    },
  });

export type Auth = ReturnType<typeof getAuth>;
export type Session = Auth["$Infer"]["Session"];

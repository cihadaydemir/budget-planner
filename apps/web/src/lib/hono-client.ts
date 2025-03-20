import type { AppType } from "../../../hono/src/index"
import { hc } from "hono/client"

export const hono = hc<AppType>(import.meta.env.VITE_BETTER_AUTH_URL as string, {
	init: {
		credentials: "include",
	},
})

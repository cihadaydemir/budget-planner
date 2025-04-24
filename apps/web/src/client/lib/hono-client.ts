import type { AppType } from "@/server"
import { hc } from "hono/client"

export const hono = hc<AppType>(import.meta.env.BASE_API_URL as string, {
	init: {
		credentials: "include",
	},
})

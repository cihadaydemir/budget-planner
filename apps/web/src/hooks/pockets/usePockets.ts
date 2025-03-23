import { hono } from "@/lib/hono-client"
import { useQuery } from "@tanstack/react-query"

export const usePockets = () =>
	useQuery({
		queryKey: ["pockets"],
		queryFn: async () => {
			const res = await hono.pockets.$get()
			if (!res.ok) {
				throw new Error("Failed to fetch pockets")
			}
			const data = await res.json()
			return data
		},
	})
// export const usePockets = () =>
// 	useQuery({
// 		queryKey: ["pockets"],
// 		queryFn: () => extractData(api.pockets.get()),
// 	})

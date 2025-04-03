import { hono } from "@/lib/hono-client"
import { useQuery } from "@tanstack/react-query"

export const usePockets = () =>
	useQuery({
		queryKey: ["pockets"],
		queryFn: async () => {
			const res = await hono.api.pockets.$get()
			console.log("pocket", res)
			if (!res.ok) {
				throw new Error("Failed to fetch pockets")
			}
			const data = await res.json()
			return data
		},
		staleTime: Number.POSITIVE_INFINITY,
	})
// export const usePockets = () =>
// 	useQuery({
// 		queryKey: ["pockets"],
// 		queryFn: () => extractData(api.pockets.get()),
// 	})

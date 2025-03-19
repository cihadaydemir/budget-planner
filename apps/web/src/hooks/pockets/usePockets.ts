import { hono } from "@/lib/hono-client"
import { useQuery } from "@tanstack/react-query"

export const usePockets = () =>
	useQuery({
		queryKey: ["pockets"],
		queryFn: async () => {
			const res = await hono.pockets.$get()
			const data = await res.json()
			return data
		},
	})
// export const usePockets = () =>
// 	useQuery({
// 		queryKey: ["pockets"],
// 		queryFn: () => extractData(api.pockets.get()),
// 	})

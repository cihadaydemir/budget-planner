import { hono } from "@/lib/hono-client"
import { useQuery } from "@tanstack/react-query"

export const useTransactions = (pocketId: string) =>
	useQuery({
		queryKey: ["transactions", pocketId],
		queryFn: async () => {
			const res = await hono.transactions.$get({ params: { pocketId } })
			return res.json()
		},
	})
// export const useTransactions = (pocketId: string) =>
// 	useQuery({
// 		queryKey: ["transactions", pocketId],
// 		queryFn: () => extractData(api.transactions.pocket({ pocketId }).get()),
// 	})

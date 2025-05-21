import { hono } from "@/client/lib/hono-client"
import { useQuery } from "@tanstack/react-query"

export const useTransactions = (pocketId: string) =>
	useQuery({
		queryKey: ["transactions", pocketId],
		queryFn: async () => {
			const res = await hono.hc.transactions[":id"].$get({ param: { id: pocketId } })
			return res.json()
		},
		staleTime: Number.POSITIVE_INFINITY,
	})
// export const useTransactions = (pocketId: string) =>
// 	useQuery({
// 		queryKey: ["transactions", pocketId],
// 		queryFn: () => extractData(api.transactions.pocket({ pocketId }).get()),
// 	})

import { hono } from "@/lib/hono-client"
import { useQuery } from "@tanstack/react-query"

export const useTransactions = (pocketId: string) =>
	useQuery({
		queryKey: ["transactions", pocketId],
		queryFn: () => hono.transactions.$get({ params: { pocketId } }),
	})
// export const useTransactions = (pocketId: string) =>
// 	useQuery({
// 		queryKey: ["transactions", pocketId],
// 		queryFn: () => extractData(api.transactions.pocket({ pocketId }).get()),
// 	})

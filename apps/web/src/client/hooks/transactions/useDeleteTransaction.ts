import { hono } from "@/client/lib/hono-client"
import { useMutation } from "@tanstack/react-query"

export const useDeleteTransaction = () =>
	useMutation({
		mutationFn: (transactionId: string) => hono.hc.transactions[":id"].$delete({ param: { id: transactionId } }),
	})
// export const useDeleteTransaction = () =>
// 	useMutation({
// 		mutationFn: (transactionId: string) => api.transactions({ transactionId }).delete(),
// 	})

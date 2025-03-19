import { hono } from "@/lib/hono-client"
import { useMutation } from "@tanstack/react-query"

export const useDeleteTransaction = () =>
	useMutation({
		mutationFn: (transactionId: string) => hono.transactions[":id"].$delete({ param: { id: transactionId } }),
	})
// export const useDeleteTransaction = () =>
// 	useMutation({
// 		mutationFn: (transactionId: string) => api.transactions({ transactionId }).delete(),
// 	})

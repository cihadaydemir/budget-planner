import type { InsertTransactionSchemaType } from "@hono/db/zod"
import { hono } from "@/lib/hono-client"
import { useMutation } from "@tanstack/react-query"

export const useEditTransaction = () =>
	useMutation({
		mutationFn: ({
			transactionId,
			data,
		}: {
			transactionId: string
			data: Partial<InsertTransactionSchemaType>
		}) => hono.api.transactions[":id"].$post({ json: data, param: { id: transactionId } }),
	})
// export const useEditTransaction = () =>
// 	useMutation({
// 		mutationFn: ({
// 			transactionId,
// 			data,
// 		}: {
// 			transactionId: string
// 			data: Partial<InsertTransactionSchemaType>
// 		}) => api.transactions.edit({ transactionId }).post(data),
// 	})

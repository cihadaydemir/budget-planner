import type { InsertTransactionSchemaType } from "@/server/db/arktype"
import { hono } from "@/client/lib/hono-client"
import { useMutation } from "@tanstack/react-query"

export const useEditTransaction = () =>
	useMutation({
		mutationFn: ({
			transactionId,
			data,
		}: {
			transactionId: string
			data: Partial<InsertTransactionSchemaType>
		}) => hono.hc.transactions[":id"].$post({ json: data, param: { id: transactionId } }),
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

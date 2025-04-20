import type { InsertTransactionSchemaType } from "@hono/db/zod"
import { hono } from "@/client/lib/hono-client"
import { useMutation } from "@tanstack/react-query"

export const useCreateTransactionMutation = () =>
	useMutation({
		mutationFn: (data: InsertTransactionSchemaType) => hono.api.transactions.$post({ json: data }),
	})
// export const useCreateTransactionMutation = () =>
// 	useMutation({
// 		mutationFn: (data: InsertTransactionSchemaType) => api.transactions.post(data),
// 	})

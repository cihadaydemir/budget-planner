import { useMutation, useQueryClient } from "@tanstack/react-query"

import type { InsertPocketSchemaType } from "@hono/db/zod"
import { hono } from "@/lib/hono-client"

export const useCreatePocketMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: InsertPocketSchemaType) => hono.pockets.$post({ json: data }),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["pockets"],
			})
		},
	})
}

// export const useCreatePocketMutation = () => {
// 	const queryClient = useQueryClient()
// 	return useMutation({
// 		mutationFn: (data: InsertPocketSchemaType) =>
// 			api.pockets.create.post({
// 				...data,
// 			}),
// 		onSuccess: (data) => {
// 			queryClient.invalidateQueries({
// 				queryKey: ["pockets"],
// 			})
// 		},
// 	})
// }

import type { ExtendedPocket, InsertPocketSchemaType, Pocket } from "@hono/db/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import type { Session } from "@/lib/auth/auth-client"
import { hono } from "@/lib/hono-client"
import { newId } from "@/utils/id"

export const useCreatePocketMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: InsertPocketSchemaType) => hono.pockets.$post({ json: data }),
		onMutate: async (updatedData) => {
			await queryClient.cancelQueries({ queryKey: ["pockets"] })
			const previousPockets = queryClient.getQueryData<ExtendedPocket[]>(["pockets"])
			const session = queryClient.getQueryData<Session>(["session"])
			if (!session) {
				throw new Error("no session")
			}
			if (previousPockets) {
				const optimistcPocket = {
					id: newId("pocket"),
					createdAt: new Date().toLocaleString("en-US"),
					updatedAt: null,
					deletedAt: null,
					userId: session.user.id,
					name: updatedData.name,
					description: updatedData.description ?? "",
					budget: updatedData.budget ?? null,
					totalSpent: 0,
				}

				queryClient.setQueryData<ExtendedPocket[]>(["pockets"], (old) => [...(old ?? []), optimistcPocket])
				return { previousPockets }
			}
		},
		onSuccess: (data) =>
			queryClient.invalidateQueries({
				queryKey: ["pockets"],
			}),
		onError: (err, variables, context) => {
			if (context?.previousPockets) {
				queryClient.setQueryData<ExtendedPocket[]>(["pockets"], context.previousPockets)
			}
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

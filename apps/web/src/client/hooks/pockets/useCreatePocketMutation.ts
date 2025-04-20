import type { ExtendedPocket, InsertPocketSchemaType } from "@hono/db/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import type { Session } from "@/client/lib/auth/auth-client"
import { hono } from "@/client/lib/hono-client"
import { newId } from "@/client/utils/id"
import { toast } from "sonner"

export const useCreatePocketMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: InsertPocketSchemaType) => hono.api.pockets.$post({ json: data }),
		onMutate: async (updatedData) => {
			await queryClient.cancelQueries({ queryKey: ["pockets"] })
			const previousPockets = queryClient.getQueryData<ExtendedPocket[]>(["pockets"])
			const session = queryClient.getQueryData<Session>(["auth"])
			if (!session) {
				throw new Error("no session")
			}

			const optimistcPocket = {
				id: newId("pocket"),
				name: updatedData.name,
				description: updatedData.description ?? null,
				budget: updatedData.budget ?? null,
				totalSpent: 0,
				userId: session.user.id,
				createdAt: new Date().toLocaleString("en-US"),
				updatedAt: null,
				deletedAt: null,
			}
			previousPockets ? [...previousPockets, optimistcPocket] : [optimistcPocket]
			queryClient.setQueryData<ExtendedPocket[]>(["pockets"], (old) => [...(old ?? []), optimistcPocket])
			return { previousPockets }
		},
		onSettled: (data) =>
			queryClient.invalidateQueries({
				queryKey: ["pockets"],
			}),
		onError: (err, variables, context) => {
			if (context?.previousPockets) {
				queryClient.setQueryData<ExtendedPocket[]>(["pockets"], context.previousPockets)
			}
			toast.error("Pocket could not be created")
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

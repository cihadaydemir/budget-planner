import { hono } from "@/client/lib/hono-client"
import { useMutation } from "@tanstack/react-query"

export const useDeletePocket = () =>
	useMutation({
		mutationFn: (pocketId: string) => hono.api.pockets[":id"].$delete({ param: { id: pocketId } }),
	})

// export const useDeletePocket = () =>
// 	useMutation({
// 		mutationFn: (pocketId: string) => api.pockets({ id: pocketId }).delete(),
// 	})

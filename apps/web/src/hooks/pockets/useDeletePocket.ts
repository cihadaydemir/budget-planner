import { hono } from "@/lib/hono-client"
import { useMutation } from "@tanstack/react-query"

export const useDeletePocket = () =>
	useMutation({
		mutationFn: (pocketId: string) => hono.pockets[":id"].$delete({ param: { id: pocketId } }),
	})

// export const useDeletePocket = () =>
// 	useMutation({
// 		mutationFn: (pocketId: string) => api.pockets({ id: pocketId }).delete(),
// 	})

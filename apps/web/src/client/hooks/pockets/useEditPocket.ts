import type { InsertPocketSchemaType } from "@/server/db/zod"
import { hono } from "@/client/lib/hono-client"
import { useMutation } from "@tanstack/react-query"

export const useEditPocket = () =>
	useMutation({
		mutationFn: ({
			pocketId,
			data,
		}: {
			data: Partial<InsertPocketSchemaType>
			pocketId: string
		}) => hono.hc.pockets[":id"].$post({ json: { ...data }, param: { id: pocketId } }),
	})

// export const useEditPocket = () =>
// 	useMutation({
// 		mutationFn: ({
// 			pocketId,
// 			data,
// 		}: {
// 			data: Partial<InsertPocketSchemaType>
// 			pocketId: string
// 		}) => api.pockets.edit({ pocketId }).post(data),
// 	})

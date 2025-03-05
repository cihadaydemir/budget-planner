import { api } from "@/lib/auth/eden-client";
import type { InsertPocketSchemaType } from "@api/db/types";
import { useMutation } from "@tanstack/react-query";

export const useEditPocket = () =>
	useMutation({
		mutationFn: ({
			pocketId,
			data,
		}: {
			data: Partial<InsertPocketSchemaType>;
			pocketId: string;
		}) => api.pockets.edit({ pocketId }).post(data),
	});

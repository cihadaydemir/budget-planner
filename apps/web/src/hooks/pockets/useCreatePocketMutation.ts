import { api } from "@/lib/eden-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InsertPocketSchemaType } from "@api/db/types/pocket";

export const useCreatePocketMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: InsertPocketSchemaType) =>
			api.pockets.create.post({
				...data,
			}),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["pockets"],
			});
		},
	});
};

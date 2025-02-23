import { api } from "@/lib/eden-client";
import { useMutation } from "@tanstack/react-query";

export const useDeletePocket = (pocketId: string) =>
	useMutation({
		mutationFn: () => api.pockets({ id: pocketId }).delete(),
	});

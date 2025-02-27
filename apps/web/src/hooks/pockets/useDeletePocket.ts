import { api } from "@/lib/eden-client";
import { useMutation } from "@tanstack/react-query";

export const useDeletePocket = () =>
	useMutation({
		mutationFn: (pocketId: string) => api.pockets({ id: pocketId }).delete(),
	});

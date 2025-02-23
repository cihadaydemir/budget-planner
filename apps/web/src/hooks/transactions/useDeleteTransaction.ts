import { api } from "@/lib/eden-client";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTransaction = (transactionId: string) =>
	useMutation({
		mutationFn: () => api.transactions({ transactionId }).delete(),
	});

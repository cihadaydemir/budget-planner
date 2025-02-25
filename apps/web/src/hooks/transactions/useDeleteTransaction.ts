import { api } from "@/lib/eden-client";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTransaction = () =>
	useMutation({
		mutationFn: (transactionId: string) =>
			api.transactions({ transactionId }).delete(),
	});

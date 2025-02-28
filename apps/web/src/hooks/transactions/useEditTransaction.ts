import { api } from "@/lib/eden-client";
import type { InsertTransactionSchemaType } from "@api/db/types";
import { useMutation } from "@tanstack/react-query";

export const useEditTransaction = () =>
	useMutation({
		mutationFn: ({
			transactionId,
			data,
		}: {
			transactionId: string;
			data: Partial<InsertTransactionSchemaType>;
		}) => api.transactions.edit({ transactionId }).post(data),
	});

import { api } from "@/lib/eden-client";
import type { CreateTransactionSchemaType } from "@api/db/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateTransactionMutation = () =>
	useMutation({
		mutationFn: (data: CreateTransactionSchemaType) =>
			api.transactions.post(data),
	});

import { api } from "@/lib/eden-client";
import type { InsertTransactionSchemaType } from "@api/db/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateTransactionMutation = () =>
	useMutation({
		mutationFn: (data: InsertTransactionSchemaType) =>
			api.transactions.post(data),
	});

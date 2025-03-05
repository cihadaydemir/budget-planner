import { api } from "@/lib/auth/eden-client";
import { extractData } from "@/utils/extract-data";
import { useQuery } from "@tanstack/react-query";

export const useTransactions = (pocketId: string) =>
	useQuery({
		queryKey: ["transactions", pocketId],
		queryFn: () => extractData(api.transactions.pocket({ pocketId }).get()),
	});

import { api } from "@/lib/eden-client";
import { useQuery } from "@tanstack/react-query";

export const usePockets = () =>
	useQuery({
		queryKey: ["pockets"],
		queryFn: () => api.pockets.get(),
	});

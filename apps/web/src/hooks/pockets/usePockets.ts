import { api } from "@/lib/eden-client";
import { extractData } from "@/utils/extract-data";

import { useQuery } from "@tanstack/react-query";

export const usePockets = () =>
	useQuery({
		queryKey: ["pockets"],
		queryFn: () => extractData(api.pockets.get()),
	});

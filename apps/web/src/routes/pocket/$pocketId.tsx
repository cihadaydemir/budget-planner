import { CreateTransactionModal } from "@/components/create-transaction-modal";
import { Heading } from "@/components/ui";
import { usePockets } from "@/hooks/pockets/usePockets";
import { useTransactions } from "@/hooks/transactions/useTransactions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pocket/$pocketId")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const { data: pockets } = usePockets();
	const pocket = pockets?.find((pocket) => pocket.id === params.pocketId);
	const { data: transactions } = useTransactions(params.pocketId);

	console.log("transactions", transactions);
	return (
		<div className="flex flex-col w-full h-full py-4">
			<div className="flex justify-between">
				<Heading level={1}>{pocket?.name}</Heading>
				<CreateTransactionModal />
			</div>
		</div>
	);
}

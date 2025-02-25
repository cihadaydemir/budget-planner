import { BudgetOverview } from "@/components/budget-overview";
import { BudgetOverviewCard } from "@/components/budget-overview-card";
import { CreateTransactionModal } from "@/components/create-transaction-modal";
import { ExpenseList } from "@/components/expense-list";
import { Heading } from "@/components/ui";
import { usePockets } from "@/hooks/pockets/usePockets";
import { useTransactions } from "@/hooks/transactions/useTransactions";
import { getTotalSpent, getTransactionsStatistics } from "@/utils/statistics";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pocket/$pocketId")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const { data: pockets } = usePockets();
	const pocket = pockets?.find((pocket) => pocket.id === params.pocketId);
	const { data: transactions } = useTransactions(params.pocketId);

	if (!transactions) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col w-full h-full py-4 gap-4">
			<div className="flex justify-between">
				<Heading level={1}>{pocket?.name}</Heading>
				<div className="md:block hidden">
					<CreateTransactionModal />
				</div>
			</div>
			{pocket?.budget && (
				<BudgetOverviewCard
					totalBudget={pocket.budget}
					statisticsData={getTransactionsStatistics(transactions)}
				/>
			)}
			<ExpenseList transactions={transactions} />
			<div className="self-center md:hidden mt-auto z-10 fixed bottom-10">
				<CreateTransactionModal />
			</div>
		</div>
	);
}

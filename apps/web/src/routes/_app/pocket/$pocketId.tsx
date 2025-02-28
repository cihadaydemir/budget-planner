import { BudgetOverviewCard } from "@/components/budget-overview-card";
import { CreateTransactionModal } from "@/components/create-transaction-modal";
import { ExpenseList } from "@/components/expense-list";
import { Heading, Tabs } from "@/components/ui";
import { usePockets } from "@/hooks/pockets/usePockets";
import { useTransactions } from "@/hooks/transactions/useTransactions";
import { getTransactionsStatistics } from "@/utils/statistics";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Collection } from "react-aria-components";

export const Route = createFileRoute("/_app/pocket/$pocketId")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const { data: pockets } = usePockets();
	const pocket = pockets?.find((pocket) => pocket.id === params.pocketId);
	const {
		data: transactions,
		isLoading: transactionsIsLoading,
		error: transactionsError,
	} = useTransactions(params.pocketId);

	if (transactionsIsLoading || transactionsError) {
		return <div>Loading...</div>;
	}

	if (!transactions) {
		return (
			<div className="flex flex-col w-full h-full py-4 gap-4">
				<div className="flex justify-between">
					<Heading level={1}>{pocket?.name}</Heading>
					<div className="md:block hidden">
						<CreateTransactionModal />
					</div>
				</div>
			</div>
		);
	}

	const tabs = [
		{
			id: 1,
			title: "All",
			content: <ExpenseList transactions={transactions} />,
		},
		{
			id: 2,
			title: "Paid",
			content: (
				<ExpenseList
					transactions={transactions.filter(
						(transaction) => transaction.isPaid === true,
					)}
				/>
			),
		},
		{
			id: 3,
			title: "Unpaid",
			content: (
				<ExpenseList
					transactions={transactions.filter(
						(transaction) => transaction.isPaid === false,
					)}
				/>
			),
		},
	];

	// const calculateStatistics = useMemo(() => {
	// 	return getTransactionsStatistics(transactions);
	// }, [transactions]);

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
					statisticsData={{ totalNotPaid: 0, totalPaid: 0, totalSpent: 0 }}
				/>
			)}

			<Tabs aria-label="Expenses" className="mt-4">
				<Tabs.List aria-label="Expense tabs" items={tabs}>
					{(item) => <Tabs.Tab>{item.title}</Tabs.Tab>}
				</Tabs.List>

				<Collection items={tabs}>
					{(item) => <Tabs.Panel key={item.id}>{item.content}</Tabs.Panel>}
				</Collection>
			</Tabs>
			<div className="self-center md:hidden mt-auto z-10 fixed bottom-10">
				<CreateTransactionModal />
			</div>
		</div>
	);
}

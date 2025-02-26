import { BudgetOverviewCard } from "@/components/budget-overview-card";
import { CreateTransactionModal } from "@/components/create-transaction-modal";
import { ExpenseList } from "@/components/expense-list";
import { Heading, Tabs } from "@/components/ui";
import { usePockets } from "@/hooks/pockets/usePockets";
import { useTransactions } from "@/hooks/transactions/useTransactions";
import { getTransactionsStatistics } from "@/utils/statistics";
import { createFileRoute } from "@tanstack/react-router";
import { Collection } from "react-aria-components";

export const Route = createFileRoute("/_app/pocket/$pocketId")({
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

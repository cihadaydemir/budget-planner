import { Button, Heading, Tabs } from "@/client/components/ui"
import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useMemo, useState } from "react"

import { BudgetOverviewCard } from "@/client/components/budget-overview-card"
import { Collection } from "react-aria-components"
import { CreateTransactionModal } from "@/client/components/create-transaction-modal"
import { ExpenseList } from "@/client/components/expense-list"
import { IconChevronLeft } from "@intentui/icons"
import { LoadingScreen } from "@/client/components/loading-screen"
import type { Transaction } from "@/server/db/zod"
import { getTransactionsStatistics } from "@/client/utils/statistics"
import { usePockets } from "@/client/hooks/pockets/usePockets"
import { useTransactions } from "@/client/hooks/transactions/useTransactions"

export const Route = createFileRoute("/_app/pocket/$pocketId")({
	component: RouteComponent,
})

function RouteComponent() {
	const params = Route.useParams()
	const { data: pockets } = usePockets()
	const pocket = pockets?.find((pocket) => pocket.id === params.pocketId)
	const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
	const [editingTransaction, setEditingTransaction] = useState<Transaction>()
	const {
		data: transactions,
		isLoading: transactionsIsLoading,
		error: transactionsError,
	} = useTransactions(params.pocketId)
	const router = useRouter()

	const calculateStatistics = useMemo(() => {
		if (!transactions) return
		return getTransactionsStatistics(transactions)
	}, [transactions])

	if (transactionsIsLoading) {
		return <LoadingScreen />
	}

	if (!transactions || transactionsError) {
		return (
			<div className="flex h-full w-full flex-col gap-4 py-4">
				<div className="flex justify-between">
					<Heading level={1}>{pocket?.name}</Heading>
					<div className="hidden md:block">
						<Button onPress={() => setIsTransactionModalOpen(true)}>Add Expense</Button>
						<CreateTransactionModal isOpen={isTransactionModalOpen} setIsOpen={setIsTransactionModalOpen} />
					</div>
				</div>
			</div>
		)
	}

	const tabs = [
		{
			id: 1,
			title: "All",
			content: (
				<ExpenseList
					transactions={transactions}
					setEditingTransaction={setEditingTransaction}
					setIsTransactionModalOpen={setIsTransactionModalOpen}
				/>
			),
		},
		{
			id: 2,
			title: "Paid",
			content: (
				<ExpenseList
					transactions={transactions.filter((transaction) => transaction.isPaid === true)}
					setEditingTransaction={setEditingTransaction}
					setIsTransactionModalOpen={setIsTransactionModalOpen}
				/>
			),
		},
		{
			id: 3,
			title: "Unpaid",
			content: (
				<ExpenseList
					transactions={transactions.filter((transaction) => transaction.isPaid === false)}
					setEditingTransaction={setEditingTransaction}
					setIsTransactionModalOpen={setIsTransactionModalOpen}
				/>
			),
		},
	]

	return (
		<div className="flex h-full w-full flex-col gap-4 py-4">
			<div className="flex items-center gap-2">
				<Button
					intent="plain"
					onPress={() => {
						router.history.back()
					}}
				>
					<IconChevronLeft />
					Pockets
				</Button>

				<div className="ml-auto hidden md:block ">
					<Button onPress={() => setIsTransactionModalOpen(true)}>Add Expense</Button>
				</div>
			</div>
			{pocket && calculateStatistics && (
				<BudgetOverviewCard
					pocketTitle={pocket?.name}
					totalBudget={pocket.budget}
					statisticsData={calculateStatistics}
				/>
			)}

			<div className="mt-4 block self-end md:hidden">
				<Button onPress={() => setIsTransactionModalOpen(true)}>Add Expense</Button>
			</div>
			<Tabs aria-label="Expenses" className="">
				<Tabs.List aria-label="Expense tabs" items={tabs}>
					{(item) => <Tabs.Tab>{item.title}</Tabs.Tab>}
				</Tabs.List>

				<Collection items={tabs}>{(item) => <Tabs.Panel key={item.id}>{item.content}</Tabs.Panel>}</Collection>
			</Tabs>
			<CreateTransactionModal isOpen={isTransactionModalOpen} setIsOpen={setIsTransactionModalOpen} />
		</div>
	)
}

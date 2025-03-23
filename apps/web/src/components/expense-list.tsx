import { Button, Card, Menu } from "./ui"
import { IconCheck, IconDotsVertical, IconHighlight, IconTrash } from "justd-icons"

import type { Transaction } from "@hono/db/zod"
import { toast } from "sonner"
import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction"
import { useEditTransaction } from "@/hooks/transactions/useEditTransaction"
import { useQueryClient } from "@tanstack/react-query"

interface ExpenseListProps {
	transactions: Transaction[]
}

export const ExpenseList = ({ transactions }: ExpenseListProps) => {
	const deleteExpenseMutation = useDeleteTransaction()
	const editTransactionMutation = useEditTransaction()
	const queryClient = useQueryClient()
	if (transactions.length === 0) {
		return (
			<div className="mt-auto mb-auto">
				<p>It seems like you don't have any expenses yet.</p>
			</div>
		)
	}

	return (
		<div className="flex flex-1 flex-col gap-2 overflow-y-scroll">
			{transactions.map((transaction) => (
				<Card key={transaction.id} className="flex items-center justify-between bg-navbar p-2">
					<div className="flex flex-col gap-1">
						<p className="font-bold">{transaction.amount}€</p>
						<p className="text-muted-fg">{transaction.name}</p>
					</div>
					<div className="flex gap-4">
						{!transaction.isPaid && (
							<Button
								intent="outline"
								onPress={() => {
									editTransactionMutation.mutate(
										{
											transactionId: transaction.id,
											data: { isPaid: true },
										},
										{
											onSuccess: () => {
												queryClient.invalidateQueries({
													queryKey: ["transactions", transaction.pocketId],
												})
												toast.success(
													`Transaction ${transaction.name} marked as paid successfully`,
												)
											},
										},
									)
								}}
							>
								<IconCheck />
								Mark as paid
							</Button>
						)}
						<Menu>
							<Menu.Trigger>
								<IconDotsVertical />
								<Menu.Content>
									<Menu.Item>
										<IconHighlight />
										Edit
									</Menu.Item>
									<Menu.Separator />
									<Menu.Item
										isDanger
										onAction={() => {
											deleteExpenseMutation.mutate(transaction.id, {
												onSuccess: () => {
													queryClient.invalidateQueries({
														queryKey: ["transactions", transaction.pocketId],
													})
													toast.success(`Expense ${transaction.name} deleted successfully`)
												},
											})
										}}
									>
										<IconTrash />
										Delete
									</Menu.Item>
								</Menu.Content>
							</Menu.Trigger>
						</Menu>
					</div>
				</Card>
			))}
		</div>
	)
}

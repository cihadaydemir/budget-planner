import type { Transaction } from "@api/db/types";
import { Button, Card, Menu } from "./ui";
import {
	IconCheck,
	IconDotsVertical,
	IconHighlight,
	IconTrash,
} from "justd-icons";
import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction";
import { toast } from "sonner";

interface ExpenseListProps {
	transactions: Transaction[];
}

export const ExpenseList = ({ transactions }: ExpenseListProps) => {
	const deleteExpenseMutation = useDeleteTransaction();

	if (transactions.length === 0) {
		return (
			<div className="mt-auto mb-auto">
				<p>It seems like you don't have any expenses yet.</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2 overflow-y-scroll flex-1">
			{transactions.map((transaction) => (
				<Card
					key={transaction.id}
					className="flex items-center p-2 justify-between"
				>
					<div className="flex flex-col gap-1">
						<p className="font-bold">{transaction.amount}€</p>
						<p className="text-muted-fg">{transaction.name}</p>
					</div>
					<div className="flex gap-4">
						{transaction.isPaid && (
							<Button appearance="outline">
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
													toast.success(
														`Expense ${transaction.name} deleted successfully`,
													);
												},
											});
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
	);
};

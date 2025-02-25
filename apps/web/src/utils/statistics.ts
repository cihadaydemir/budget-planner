import type { Transaction } from "@api/db/types";

export type StatisticsDataType = {
	totalSpent: number;
	totalPaid: number;
	totalNotPaid: number;
};

export const getTransactionsStatistics = (transactions: Transaction[]) => {
	if (transactions.length === 0) {
		console.log("no transactions");
		return null;
	}
	const defaultStatistics = {
		totalSpent: 0,
		totalPaid: 0,
		totalNotPaid: 0,
	} satisfies StatisticsDataType;

	return transactions.reduce((acc, transaction) => {
		return {
			totalSpent: acc.totalSpent + transaction.amount,
			totalPaid: acc.totalPaid + (transaction.isPaid ? transaction.amount : 0),
			totalNotPaid:
				acc.totalNotPaid + (transaction.isPaid ? 0 : transaction.amount),
		};
	}, defaultStatistics);
};

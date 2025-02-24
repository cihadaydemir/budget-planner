import type { StatisticsDataType } from "@/utils/statistics";
import { Card } from "./ui";

interface BudgetOverviewCardProps {
	totalBudget: number;
	statisticsData: StatisticsDataType;
}

export const BudgetOverviewCard = ({
	statisticsData,
	totalBudget,
}: BudgetOverviewCardProps) => {
	return (
		<Card>
			<Card.Content>
				<div className="flex gap-2 py-2">
					<p>{`${statisticsData.totalSpent}/${totalBudget}`}</p>
				</div>
			</Card.Content>
		</Card>
	);
};

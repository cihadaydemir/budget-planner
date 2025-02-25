import type { StatisticsDataType } from "@/utils/statistics";
import { Card, Meter } from "./ui";

interface BudgetOverviewCardProps {
	totalBudget: number | null;
	statisticsData: StatisticsDataType;
}

export const BudgetOverviewCard = ({
	statisticsData,
	totalBudget,
}: BudgetOverviewCardProps) => {
	const getValueLabelText = () => {
		if (totalBudget) {
			return `${statisticsData.totalSpent} of ${totalBudget}€`;
		}
		return `${statisticsData.totalSpent} Euro`;
	};

	return (
		<Card>
			<Card.Content>
				<div className="flex gap-2 py-2 justify-between flex-wrap">
					{!totalBudget && <p>{statisticsData.totalSpent} Euro</p>}
					{totalBudget && (
						<>
							<div className="flex flex-col gap-1">
								<p className="text-muted-fg">Total Budget</p>
								<p className="font-bold">{`${totalBudget}€`}</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="text-muted-fg">Paid</p>
								<p className="font-bold">{`${statisticsData.totalPaid}€`}</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="text-muted-fg">Not Paid</p>
								<p className="font-bold">{`${statisticsData.totalNotPaid}€`}</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="text-muted-fg">Remaining</p>
								<p className="font-bold">{`${totalBudget - statisticsData.totalSpent}€`}</p>
							</div>
						</>
					)}
				</div>
				<Meter
					label="Spent"
					value={statisticsData.totalSpent}
					maxValue={totalBudget ?? undefined}
					formatOptions={{ style: "currency", currency: "EUR" }}
					valueLabel={getValueLabelText()}
				/>
			</Card.Content>
		</Card>
	);
};

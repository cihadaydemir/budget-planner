import type { StatisticsDataType } from "@/utils/statistics";
import { Card, Grid, Meter } from "./ui";

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
		<Card className="bg-navbar">
			<Card.Content className="flex flex-col p-4 gap-4">
				{/* <div className="flex gap-2 py-2 justify-between">
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
				</div> */}
				{!totalBudget && <p>{statisticsData.totalSpent} Euro</p>}
				{totalBudget && (
					<Grid
						columns={{
							initial: 2,
							xs: 2,
							sm: 2,
							md: 4,
							lg: 4,
							xl: 4,
						}}
						gap={{
							initial: 2,
						}}
						autoRows="fr"
					>
						<Grid.Item className="flex flex-col gap-1">
							<p className="text-muted-fg">Total Budget</p>
							<p className="font-bold">{`${totalBudget}€`}</p>
						</Grid.Item>
						<Grid.Item className="flex flex-col gap-1">
							<p className="text-muted-fg">Remaining</p>
							<p className="font-bold">{`${totalBudget - statisticsData.totalSpent}€`}</p>
						</Grid.Item>
						<Grid.Item className="flex flex-col gap-1">
							<p className="text-muted-fg">Paid</p>
							<p className="font-bold">{`${statisticsData.totalPaid}€`}</p>
						</Grid.Item>
						<Grid.Item className="flex flex-col gap-1">
							<p className="text-muted-fg">Not Paid</p>
							<p className="font-bold">{`${statisticsData.totalNotPaid}€`}</p>
						</Grid.Item>
					</Grid>
				)}

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

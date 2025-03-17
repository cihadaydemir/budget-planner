import type { StatisticsDataType } from "@/utils/statistics";
import { Card, Grid, Heading, Meter } from "./ui";

interface BudgetOverviewCardProps {
	pocketTitle: string;
	totalBudget: number | null;
	statisticsData: StatisticsDataType;
}

export const BudgetOverviewCard = ({ pocketTitle, statisticsData, totalBudget }: BudgetOverviewCardProps) => {
	const getValueLabelText = () => {
		if (totalBudget) {
			return `${statisticsData.totalSpent.toLocaleString("DE-de")} of ${totalBudget.toLocaleString("DE-de")}€`;
		}
		return `${statisticsData.totalSpent.toLocaleString("DE-de")} Euro`;
	};

	return (
		<Card className="bg-navbar">
			<Card.Content className="flex flex-col p-4 gap-4">
				<Heading level={3}>{pocketTitle}</Heading>

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
					{totalBudget ? (
						<>
							<Grid.Item className="flex flex-col gap-1">
								<p className="text-muted-fg">Total Budget</p>
								<p className="font-bold">{`${totalBudget.toLocaleString("DE-de")}€`}</p>
							</Grid.Item>
							<Grid.Item className="flex flex-col gap-1">
								<p className="text-muted-fg">Remaining</p>
								<p className="font-bold">{`${(totalBudget - statisticsData.totalSpent).toLocaleString("DE-de")}€`}</p>
							</Grid.Item>
						</>
					) : (
						<>
							<Grid.Item className="flex flex-col gap-1" colSpan={2}>
								<p className="text-muted-fg">Total Spent</p>
								<p className="font-bold">{`${statisticsData.totalSpent.toLocaleString("DE-de")}€`}</p>
							</Grid.Item>
						</>
					)}
					<Grid.Item className="flex flex-col gap-1">
						<p className="text-muted-fg">Paid</p>
						<p className="font-bold">{`${statisticsData.totalPaid.toLocaleString("DE-de")}€`}</p>
					</Grid.Item>
					<Grid.Item className="flex flex-col gap-1">
						<p className="text-muted-fg">Not Paid</p>
						<p className="font-bold">{`${statisticsData.totalNotPaid.toLocaleString("DE-de")}€`}</p>
					</Grid.Item>
				</Grid>

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

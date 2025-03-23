import { Card, Grid, Heading, Meter } from "./ui"

import type { StatisticsDataType } from "@/utils/statistics"

interface BudgetOverviewCardProps {
	pocketTitle: string
	totalBudget: number | null
	statisticsData: StatisticsDataType
}

export const BudgetOverviewCard = ({ pocketTitle, statisticsData, totalBudget }: BudgetOverviewCardProps) => {
	const getValueLabelText = () => {
		if (totalBudget) {
			return `${statisticsData.totalSpent.toLocaleString("DE-de")} of ${totalBudget.toLocaleString("DE-de")}€`
		}
		return `${statisticsData.totalSpent.toLocaleString("DE-de")} Euro`
	}

	return (
		<Card className="bg-navbar">
			<Card.Content className="flex flex-col gap-4 p-4">
				<Heading level={3}>{pocketTitle}</Heading>

				<div className="grid grid-cols-2 gap-2 md:grid-cols-4">
					{totalBudget ? (
						<>
							<div className="flex flex-col gap-1">
								<p className="text-muted-fg">Total Budget</p>
								<p className="font-bold">{`${totalBudget.toLocaleString("DE-de")}€`}</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="text-muted-fg">Remaining</p>
								<p className="font-bold">{`${(totalBudget - statisticsData.totalSpent).toLocaleString("DE-de")}€`}</p>
							</div>
						</>
					) : (
						<>
							<div className="col-span-2 flex flex-col gap-1">
								<p className="text-muted-fg">Total Spent</p>
								<p className="font-bold">{`${statisticsData.totalSpent.toLocaleString("DE-de")}€`}</p>
							</div>
						</>
					)}
					<div className="flex flex-col gap-1">
						<p className="text-muted-fg">Paid</p>
						<p className="font-bold">{`${statisticsData.totalPaid.toLocaleString("DE-de")}€`}</p>
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-muted-fg">Not Paid</p>
						<p className="font-bold">{`${statisticsData.totalNotPaid.toLocaleString("DE-de")}€`}</p>
					</div>
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
	)
}

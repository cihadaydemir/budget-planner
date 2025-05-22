import { Button, Card, Menu, Meter } from "./ui"
import type { ExtendedPocket, Pocket } from "@/server/db/zod"
import { IconDotsVertical, IconHighlight, IconTrash } from "@intentui/icons"

import { toast } from "sonner"
import { useDeletePocket } from "@/client/hooks/pockets/useDeletePocket"
import { useNavigate } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"

interface PocketsCardProps {
	pocket: ExtendedPocket
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	setEditingPocket: (pocket: Pocket) => void
}

export const PocketsCard = ({ pocket, setIsOpen, setEditingPocket }: PocketsCardProps) => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const deletePocketMutation = useDeletePocket()

	return (
		<Card
			key={pocket.id}
			onClick={() =>
				navigate({
					to: "/pocket/$pocketId",
					params: { pocketId: pocket.id },
				})
			}
			className="w-full min-w-[250px] cursor-pointer"
		>
			<Card.Header className=" flex w-full flex-row items-center justify-between">
				<Card.Title>
					<p className="font-bold">{pocket.name}</p>
				</Card.Title>
				<Menu>
					<Button size="square-petite" intent="plain">
						<IconDotsVertical className="size-4" />
					</Button>

					<Menu.Content>
						<Menu.Item
							onAction={() => {
								setEditingPocket(pocket)
								setIsOpen(true)
							}}
						>
							<IconHighlight />
							Edit
						</Menu.Item>
						<Menu.Separator />
						<Menu.Item
							isDanger
							onAction={() =>
								deletePocketMutation.mutate(pocket.id, {
									onSuccess: () => {
										toast.success(`Pocket ${pocket.name} deleted successfully`)
										queryClient.invalidateQueries({
											queryKey: ["pockets"],
										})
									},
								})
							}
						>
							<IconTrash />
							Delete
						</Menu.Item>
					</Menu.Content>
				</Menu>
			</Card.Header>
			<Card.Content className="flex w-full flex-col gap-2">
				<p>{pocket.description}</p>
				{pocket.budget && <p>{pocket.budget.toLocaleString("DE-de")} EUR</p>}
				<Meter
					label="Spent"
					value={pocket.totalSpent}
					maxValue={pocket.budget ?? undefined}
					formatOptions={{ style: "currency", currency: "EUR" }}
				/>
			</Card.Content>
		</Card>
	)
}

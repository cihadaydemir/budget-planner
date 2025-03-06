import { useDeletePocket } from "@/hooks/pockets/useDeletePocket";
import type { Pocket } from "@api/db/types";
import { useNavigate } from "@tanstack/react-router";
import { IconDotsVertical, IconHighlight, IconTrash } from "justd-icons";
import { toast } from "sonner";
import { Button, Card, Menu } from "./ui";
import { useQueryClient } from "@tanstack/react-query";

interface PocketsCardProps {
	pocket: Pocket;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	setEditingPocket: (pocket: Pocket) => void;
}

export const PocketsCard = ({
	pocket,
	isOpen,
	setIsOpen,
	setEditingPocket,
}: PocketsCardProps) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const deletePocketMutation = useDeletePocket();

	return (
		<>
			<Card
				key={pocket.id}
				onClick={() =>
					navigate({
						to: "/pocket/$pocketId",
						params: { pocketId: pocket.id },
					})
				}
				className="cursor-pointer min-w-[250px] w-full"
			>
				<Card.Header className=" w-full flex flex-row justify-between items-center">
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
									setEditingPocket(pocket);
									setIsOpen(true);
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
											toast.success(
												`Pocket ${pocket.name} deleted successfully`,
											);
											queryClient.invalidateQueries({
												queryKey: ["pockets"],
											});
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
				<Card.Content>
					<p>{pocket.description}</p>
					{pocket.budget && <p>{pocket.budget.toLocaleString("DE-de")} EUR</p>}
				</Card.Content>
			</Card>
		</>
	);
};

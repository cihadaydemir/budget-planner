import type { Pocket } from "@api/db/types";
import { Card, Menu } from "./ui";
import { IconDotsVertical, IconHighlight, IconTrash } from "justd-icons";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useDeletePocket } from "@/hooks/pockets/useDeletePocket";
import { useEditPocket } from "@/hooks/pockets/useEditPocket";
import { CreatePocketModal } from "./create-pocket-modal";

interface PocketsCardProps {
	pocket: Pocket;
}

export const PocketsCard = ({ pocket }: PocketsCardProps) => {
	const navigate = useNavigate();
	const deletePocketMutation = useDeletePocket();

	return (
		<Card
			key={pocket.id}
			onClick={() =>
				navigate({
					to: "/pocket/$pocketId",
					params: { pocketId: pocket.id },
				})
			}
			className="cursor-pointer min-w-[250px]"
		>
			<Card.Header className=" w-full flex flex-row justify-between">
				<Card.Title>
					<p className="font-bold">{pocket.name}</p>
				</Card.Title>
				<Menu>
					<Menu.Trigger>
						<IconDotsVertical className="size-4" />
					</Menu.Trigger>
					<Menu.Content>
						<CreatePocketModal isEdit />
						{/* <Menu.Item>
							<IconHighlight />
							Edit
						</Menu.Item> */}
						<Menu.Separator />
						<Menu.Item
							isDanger
							onAction={() =>
								deletePocketMutation.mutate(pocket.id, {
									onSuccess: () => {
										toast.success(`Pocket ${pocket.name} deleted successfully`);
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
				{pocket.budget && <p>{pocket.budget} EUR</p>}
			</Card.Content>
		</Card>
	);
};

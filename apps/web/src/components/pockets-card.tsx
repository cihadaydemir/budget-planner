import { useDeletePocket } from "@/hooks/pockets/useDeletePocket";
import type { Pocket } from "@api/db/types";
import { useNavigate } from "@tanstack/react-router";
import { IconDotsVertical, IconHighlight, IconTrash } from "justd-icons";
import { useState } from "react";
import { toast } from "sonner";
import { CreatePocketModal } from "./create-pocket-modal";
import { Card, Menu } from "./ui";

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
	const deletePocketMutation = useDeletePocket();
	// const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
		</>
	);
};

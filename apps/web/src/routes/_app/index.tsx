import { CreatePocketModal } from "@/components/create-pocket-modal";
import { Card, Heading, Menu } from "@/components/ui";
import { useDeletePocket } from "@/hooks/pockets/useDeletePocket";
import { usePockets } from "@/hooks/pockets/usePockets";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { IconDotsVertical, IconHighlight, IconTrash } from "justd-icons";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/")({
	component: HomeComponent,
});

function HomeComponent() {
	const { data: pockets, error, isLoading } = usePockets();
	const deletePocketMutation = useDeletePocket();
	const navigate = useNavigate();

	if (!pockets) {
		console.log("no pockets");
		return (
			<div className="h-full flex flex-col justify-center items-center gap-3">
				<p>Seems like you don't have any pockets yet.</p>
				<div className="hidden md:block">
					<CreatePocketModal />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full h-full gap-3 py-4">
			<div className="flex justify-between">
				<Heading level={1}>Pockets</Heading>
				<div className="hidden md:block">
					<CreatePocketModal />
				</div>
			</div>
			<div className="flex flex-col md:flex-row gap-3">
				{pockets.map((item) => (
					<Card
						key={item.id}
						onClick={() =>
							navigate({
								to: "/pocket/$pocketId",
								params: { pocketId: item.id },
							})
						}
					>
						<Card.Header className=" w-full flex flex-row justify-between">
							<Card.Title>
								<p className="font-bold">{item.name}</p>
							</Card.Title>
							<Menu>
								<Menu.Trigger>
									<IconDotsVertical className="size-4" />
								</Menu.Trigger>
								<Menu.Content>
									<Menu.Item>
										<IconHighlight />
										Edit
									</Menu.Item>
									<Menu.Separator />
									<Menu.Item
										isDanger
										onAction={() =>
											deletePocketMutation.mutate(item.id, {
												onSuccess: () => {
													toast.success(
														`Pocket ${item.name} deleted successfully`,
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
							<p>{item.description}</p>
							{item.budget && <p>{item.budget} EUR</p>}
						</Card.Content>
					</Card>
				))}
			</div>
			<div className="self-center md:hidden mt-auto z-10 fixed bottom-10">
				<CreatePocketModal />
			</div>
		</div>
	);
}

import { CreatePocketModal } from "@/components/create-pocket-modal";
import { PocketsCard } from "@/components/pockets-card";
import { Button, Heading } from "@/components/ui";
import { usePockets } from "@/hooks/pockets/usePockets";
import type { Pocket } from "@api/db/types";

import { createFileRoute } from "@tanstack/react-router";
import { IconPlus } from "justd-icons";
import { useState } from "react";

export const Route = createFileRoute("/_app/")({
	component: HomeComponent,
});

function HomeComponent() {
	const { data: pockets, error, isLoading } = usePockets();
	const [isOpen, setIsOpen] = useState(false);
	const [editingPocket, setEditingPocket] = useState<Pocket>();

	if (!pockets) {
		console.log("no pockets");
		return (
			<div className="h-full flex flex-col justify-center items-center gap-3">
				<p>Seems like you don't have any pockets yet.</p>
				<div className="hidden md:block">
					<Button onPress={() => setIsOpen(true)}>Create Pocket</Button>
					{/* <CreatePocketModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full h-full gap-3 py-4">
			<div className="flex justify-between">
				<Heading level={1}>Pockets</Heading>
				<div className="hidden md:block">
					<Button onPress={() => setIsOpen(true)}>
						<IconPlus />
						Create Pocket
					</Button>
				</div>
			</div>
			<div className="flex flex-col md:flex-row gap-3">
				{pockets.map((pocket) => (
					<PocketsCard
						key={pocket.id}
						pocket={pocket}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						setEditingPocket={setEditingPocket}
					/>
				))}
			</div>
			<div className="self-center md:hidden mt-auto z-10 fixed bottom-10">
				<Button onPress={() => setIsOpen(true)}>
					<IconPlus />
					Create Pocket
				</Button>
			</div>
			<CreatePocketModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				editingPocket={editingPocket}
				setEditingPocket={setEditingPocket}
			/>
		</div>
	);
}

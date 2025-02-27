import { CreatePocketModal } from "@/components/create-pocket-modal";
import { PocketsCard } from "@/components/pockets-card";
import { Heading } from "@/components/ui";
import { usePockets } from "@/hooks/pockets/usePockets";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
	component: HomeComponent,
});

function HomeComponent() {
	const { data: pockets, error, isLoading } = usePockets();

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
				{pockets.map((pocket) => (
					<PocketsCard key={pocket.id} pocket={pocket} />
				))}
			</div>
			<div className="self-center md:hidden mt-auto z-10 fixed bottom-10">
				<CreatePocketModal />
			</div>
		</div>
	);
}

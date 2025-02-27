import { CreatePocketModal } from "@/components/create-pocket-modal";
import { Card, Heading } from "@/components/ui";
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
			<div className="w-full h-full flex flex-col justify-center items-center gap-3">
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
					<Card key={item.id}>
						<Card.Header>
							<Card.Title>
								<p className="font-bold">{item.name}</p>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<p>{item.description}</p>
							<p>{item.budget} EUR</p>
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

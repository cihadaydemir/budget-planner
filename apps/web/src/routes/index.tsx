import { CreatePocketModal } from "@/components/create-pocket-modal";
import { Button } from "@/components/ui";
import { usePockets } from "@/hooks/pockets/usePockets";
import { api } from "@/lib/eden-client";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	const { data: pockets, error, isLoading } = usePockets();

	if (!pockets) {
		return (
			<div className="w-full h-full flex flex-col justify-center items-center gap-3">
				<p>Seems like you don't have any pockets yet.</p>
				<CreatePocketModal />
			</div>
		);
	}

	return (
		<div className="p-2">
			{pockets.map((item) => (
				<div key={item.id}>
					<p className="font-bold">{item.name}</p>
					<p>{item.description}</p>
					<p>{item.budget} EUR</p>
				</div>
			))}
		</div>
	);
}

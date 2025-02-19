import { client } from "@/lib/eden-client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	const pockets = client.pockets.get();
	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
		</div>
	);
}

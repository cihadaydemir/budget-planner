import { usePockets } from "@/hooks/pockets/usePockets";
import { api } from "@/lib/eden-client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	const { data, error } = usePockets();
	console.log("data", data);
	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			{data?.data ? (
				data.data.map((item) => (
					<div>
						<p className="font-bold">{item.name}</p>
						<p>{item.description}</p>
						<p>{item.budget} EUR</p>
					</div>
				))
			) : (
				<p>Seems like you don't have any pockets yet. Create one</p>
			)}
		</div>
	);
}

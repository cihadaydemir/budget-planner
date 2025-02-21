import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pocket/$pocketId")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	return <div>Hello {params.pocketId}!</div>;
}

import { Heading } from "@/components/ui";
import { usePockets } from "@/hooks/pockets/usePockets";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pocket/$pocketId")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const { data: pockets } = usePockets();
	const pocket = pockets?.find((pocket) => pocket.id === params.pocketId);
	return (
		<div className="flex flex-col w-full h-full">
			<Heading level={1}>{pocket?.name}</Heading>
		</div>
	);
}

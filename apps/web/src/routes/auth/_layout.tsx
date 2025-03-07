import { Container } from "@/components/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Container
			intent="padded-content"
			className="h-full w-full py-4 justify-items-center"
		>
			<Outlet />
		</Container>
	);
}

import { Providers } from "@/components/providers";
import { Container } from "@/components/ui";
import type { AuthContext } from "@/main";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface RouterContext {
	auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<Providers>
			<Container intent="padded-content" className="h-full w-full">
				<Outlet />
			</Container>
			<TanStackRouterDevtools position="bottom-right" />
		</Providers>
	);
}

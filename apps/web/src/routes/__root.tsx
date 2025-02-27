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
			<Outlet />

			<TanStackRouterDevtools position="bottom-right" />
		</Providers>
	);
}

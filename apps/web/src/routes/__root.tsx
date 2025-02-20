import { Providers } from "@/components/providers";
import {
	Link,
	type NavigateOptions,
	Outlet,
	type ToOptions,
	createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
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

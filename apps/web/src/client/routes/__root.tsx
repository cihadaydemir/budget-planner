import { Outlet, createRootRouteWithContext } from "@tanstack/react-router"

import { Providers } from "@/client/components/providers"
import type { QueryClient } from "@tanstack/react-query"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

interface RouterContext {
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
})

function RootComponent() {
	return (
		<Providers>
			<Outlet />

			{import.meta.env.DEV && <TanStackRouterDevtools position="bottom-left" />}
		</Providers>
	)
}

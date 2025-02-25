import { Providers } from "@/components/providers";
import AppSidebar from "@/components/sidebar/app-sidebar";
import AppSidebarNav from "@/components/sidebar/app-sidebar-nav";
import { Container, SidebarInset, Toast } from "@/components/ui";
import { authClient } from "@/lib/auth-client";
import {
	Link,
	type NavigateOptions,
	Outlet,
	type ToOptions,
	createRootRoute,
	redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: RootComponent,
	beforeLoad: async () => {
		//TODO this causes infinite loop in backend, implement auth context for tanstack-router
		const { data } = await authClient.getSession();
		if (!data) {
			throw redirect({
				to: "/auth/sign-in",
			});
		}
	},
});

function RootComponent() {
	return (
		<Providers>
			<AppSidebar collapsible="dock" />
			<SidebarInset>
				<AppSidebarNav />
				<Container intent="padded-content" className="h-full w-full">
					<Toast />
					<Outlet />
				</Container>
				<TanStackRouterDevtools position="bottom-right" />
			</SidebarInset>
		</Providers>
	);
}

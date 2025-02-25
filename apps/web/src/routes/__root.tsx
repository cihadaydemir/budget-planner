import { Providers } from "@/components/providers";
import AppSidebar from "@/components/sidebar/app-sidebar";
import AppSidebarNav from "@/components/sidebar/app-sidebar-nav";
import { Container, SidebarInset, Toast } from "@/components/ui";
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

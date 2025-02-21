import { Providers } from "@/components/providers";
import AppSidebar from "@/components/sidebar/app-sidebar";
import AppSidebarNav from "@/components/sidebar/app-sidebar-nav";
import { Container, SidebarInset } from "@/components/ui";
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
				<main className="flex min-h-screen flex-col items-center py-2 bg-bg text-fg overflow-y-hidden">
					<Container intent="padded-content" className="h-full w-full">
						<Outlet />
					</Container>
				</main>
				<TanStackRouterDevtools position="bottom-right" />
			</SidebarInset>
		</Providers>
	);
}

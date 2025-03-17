import { Container, SidebarInset, SidebarProvider } from "@/components/ui";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import AppSidebar from "@/components/sidebar/app-sidebar";
import AppSidebarNav from "@/components/sidebar/app-sidebar-nav";
import { authQueryOptions } from "@/lib/auth/use-auth";

export const Route = createFileRoute("/_app")({
	component: AppLayout,
	beforeLoad: async ({ context }) => {
		const authData = await context.queryClient.ensureQueryData(authQueryOptions);

		if (!authData) {
			throw redirect({
				to: "/auth/sign-in",
			});
		}
	},
});

function AppLayout() {
	return (
		<SidebarProvider>
			<AppSidebar collapsible="dock" />
			<SidebarInset>
				<AppSidebarNav />
				<Container intent="padded-content" className="h-full w-full">
					<Outlet />
				</Container>
			</SidebarInset>
		</SidebarProvider>
	);
}

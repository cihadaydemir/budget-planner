import { Container, SidebarInset, SidebarProvider } from "@/client/components/ui"
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

import AppSidebar from "@/client/components/sidebar/app-sidebar"
import AppSidebarNav from "@/client/components/sidebar/app-sidebar-nav"
import { authQueryOptions } from "@/client/lib/auth/use-auth"

export const Route = createFileRoute("/_app")({
	component: AppLayout,
	beforeLoad: async ({ context }) => {
		const authData = await context.queryClient.ensureQueryData(authQueryOptions)

		if (!authData) {
			throw redirect({
				to: "/auth/sign-in",
			})
		}
	},
})

function AppLayout() {
	return (
		<SidebarProvider>
			<AppSidebar collapsible="dock" />
			<SidebarInset>
				<AppSidebarNav />
				<Container className="h-full w-full overflow-hidden">
					<Outlet />
				</Container>
			</SidebarInset>
		</SidebarProvider>
	)
}

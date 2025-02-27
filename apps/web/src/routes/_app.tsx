import AppSidebar from "@/components/sidebar/app-sidebar";
import AppSidebarNav from "@/components/sidebar/app-sidebar-nav";
import { Container, SidebarInset, SidebarProvider } from "@/components/ui";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
	component: AppLayout,
	beforeLoad: ({ context }) => {
		const data = context.auth.session;
		console.log("data in loader", data);
		if (!data) {
			// throw redirect({
			// 	to: "/auth/sign-in",
			// });
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

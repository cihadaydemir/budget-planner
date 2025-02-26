import AppSidebar from "@/components/sidebar/app-sidebar";
import AppSidebarNav from "@/components/sidebar/app-sidebar-nav";
import { SidebarInset } from "@/components/ui";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
	component: AuthLayout,
	beforeLoad: ({ context }) => {
		const data = context.auth.session;
		if (!data) {
			throw redirect({
				to: "/auth/sign-in",
			});
		}
	},
});

function AuthLayout() {
	return (
		<>
			<AppSidebar collapsible="dock" />
			<SidebarInset>
				<AppSidebarNav />
				<Outlet />
			</SidebarInset>
		</>
	);
}

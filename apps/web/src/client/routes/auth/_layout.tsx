import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

import { Container } from "@/client/components/ui"
import { authQueryOptions } from "@/client/lib/auth/use-auth"

export const Route = createFileRoute("/auth/_layout")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		const session = await context.queryClient.ensureQueryData(authQueryOptions)
		if (session) {
			throw redirect({
				to: "/",
			})
		}
	},
})

function RouteComponent() {
	return (
		<Container className="h-full w-full justify-items-center py-4">
			<Outlet />
		</Container>
	)
}

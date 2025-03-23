import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

import { Container } from "@/components/ui"
import { authQueryOptions } from "@/lib/auth/use-auth"

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
		<Container intent="padded-content" className="h-full w-full justify-items-center py-4">
			<Outlet />
		</Container>
	)
}

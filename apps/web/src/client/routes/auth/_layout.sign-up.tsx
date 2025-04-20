import { Link, createFileRoute } from "@tanstack/react-router"

import { CredentialLoginForm } from "@/client/components/auth/credential-login-form"
import { Heading } from "@/client/components/ui"

export const Route = createFileRoute("/auth/_layout/sign-up")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex h-full w-full flex-col gap-3 md:max-w-lg">
			<Heading className="mb-3">Sign Up</Heading>

			<CredentialLoginForm isSignUp />
			<p className="text-center text-sm text-sutle-fg">
				You already have an account?{" "}
				<Link to="/auth/sign-in" className="text-primary">
					Sign in
				</Link>
			</p>
		</div>
	)
}

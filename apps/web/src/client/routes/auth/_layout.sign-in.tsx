import { Heading, ShowMore } from "@/client/components/ui"
import { Link, createFileRoute } from "@tanstack/react-router"

import { CredentialLoginForm } from "@/client/components/auth/credential-login-form"
import { OAuthButton } from "@/client/components/auth/oauth-button"
import { oauthProviders } from "@/client/lib/auth/constants"

export const Route = createFileRoute("/auth/_layout/sign-in")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex h-full w-full flex-col gap-3 md:max-w-lg">
			<Heading className="mb-3">Sign In</Heading>
			<CredentialLoginForm />
			<p className="text-center text-muted-fg text-sm">
				No account yet?{" "}
				<Link to="/auth/sign-up" className="text-primary">
					Sign up
				</Link>{" "}
				to create an account.
			</p>
			<ShowMore as="text" text="Or Sign in via" className="my-5" />
			{oauthProviders.map((provider) => (
				<OAuthButton key={provider} provider={provider} />
			))}
		</div>
	)
}

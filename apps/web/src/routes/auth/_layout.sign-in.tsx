import { CredentialLoginForm } from "@/components/auth/credential-login-form";
import { OAuthButton } from "@/components/auth/oauth-button";
import { Heading, ShowMore } from "@/components/ui";
import { oauthProviders } from "@/lib/auth/constants";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_layout/sign-in")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-3 w-full h-full md:max-w-lg">
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
	);
}

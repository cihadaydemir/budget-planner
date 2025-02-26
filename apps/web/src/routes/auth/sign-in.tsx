import { CredentialLoginForm } from "@/components/auth/credential-login-form";
import { OAuthButton } from "@/components/auth/oauth-button";
import { Heading, ShowMore } from "@/components/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-in")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-3 w-full h-full md:max-w-lg justify-center">
			<Heading className="mb-3">Sign In</Heading>
			<CredentialLoginForm />
			<ShowMore as="text" text="Or Sign in via" className="my-5" />
			<OAuthButton />
		</div>
	);
}

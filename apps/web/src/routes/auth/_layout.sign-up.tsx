import { CredentialLoginForm } from "@/components/auth/credential-login-form";
import { Heading } from "@/components/ui";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_layout/sign-up")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-3 w-full h-full md:max-w-lg">
			<Heading className="mb-3">Sign Up</Heading>

			<CredentialLoginForm isSignUp />
			<p className="text-sutle-fg text-sm text-center">
				You already have an account?{" "}
				<Link to="/auth/sign-in" className="text-primary">
					Sign in
				</Link>
			</p>
		</div>
	);
}

import { signIn } from "@/lib/auth/auth-client";
import { IconBrandGithub, IconBrandGoogle } from "justd-icons";
import { Button } from "../ui";
import type { oauthProviders } from "@/lib/auth/constants";

interface OAuthButtonProps {
	provider: (typeof oauthProviders)[number];
}

//TODO: add pattern matcher for icon and text
export const OAuthButton = ({ provider }: OAuthButtonProps) => {
	return (
		<Button
			appearance="outline"
			onPress={async () => {
				await signIn.social({
					provider: provider,
					fetchOptions: {
						onError: (ctx) => {
							console.error(ctx.error);
						},
					},
					callbackURL: window.location.origin,
				});
			}}
		>
			{provider === "github" && <IconBrandGithub />}
			{provider === "google" && <IconBrandGoogle />}
			{provider.slice(0, 1).toUpperCase() + provider.slice(1)}
		</Button>
	);
};

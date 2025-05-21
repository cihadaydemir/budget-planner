import { IconBrandGithub, IconBrandGoogle } from "@intentui/icons"

import { Button } from "../ui"
import type { oauthProviders } from "@/client/lib/auth/constants"
import { signIn } from "@/client/lib/auth/auth-client"

interface OAuthButtonProps {
	provider: (typeof oauthProviders)[number]
}

//TODO: add pattern matcher for icon and text
export const OAuthButton = ({ provider }: OAuthButtonProps) => {
	return (
		<Button
			intent="outline"
			onPress={async () => {
				await signIn.social({
					provider: provider,
					fetchOptions: {
						onError: (ctx) => {
							console.error(ctx.error)
						},
					},
					callbackURL: window.location.origin,
				})
			}}
		>
			{provider === "github" && <IconBrandGithub />}
			{provider === "google" && <IconBrandGoogle />}
			{provider.slice(0, 1).toUpperCase() + provider.slice(1)}
		</Button>
	)
}

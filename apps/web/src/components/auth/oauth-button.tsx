import { authClient } from "@/lib/auth-client";
import { Button } from "../ui";
import { IconBrandGithub } from "justd-icons";

export const OAuthButton = () => {
	return (
		<Button
			onPress={async () => {
				await authClient.signIn.social({
					provider: "github",
					fetchOptions: {
						onError: (ctx) => {
							console.error(ctx.error);
						},
					},
				});
			}}
		>
			<IconBrandGithub />
			Github
		</Button>
	);
};

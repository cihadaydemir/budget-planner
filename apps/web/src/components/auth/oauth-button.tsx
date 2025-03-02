import { signIn } from "@/lib/auth-client";
import { IconBrandGithub } from "justd-icons";
import { Button } from "../ui";

export const OAuthButton = () => {
	return (
		<Button
			onPress={async () => {
				await signIn.social({
					provider: "github",
					fetchOptions: {
						onError: (ctx) => {
							console.error(ctx.error);
						},
					},
					callbackURL: "http://localhost:3001",
				});
			}}
		>
			<IconBrandGithub />
			Github
		</Button>
	);
};

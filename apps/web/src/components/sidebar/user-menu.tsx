import {
	IconDashboard,
	IconDeviceDesktop,
	IconLogout,
	IconMoon,
	IconSettings,
	IconSun,
} from "justd-icons";

// import { authClient } from "~/lib/auth-client";

import { useRouter } from "@tanstack/react-router";

import { Avatar, Menu } from "../ui";
import { useTheme } from "../theme-provider";

export default function UserMenu() {
	const { theme, setTheme } = useTheme();
	const router = useRouter();
	// const { data: session } = authClient.useSession();

	return (
		<Menu>
			<Menu.Trigger className="ml-auto md:hidden" aria-label="Open Menu">
				<Avatar alt="User avatar" src={"session?.user.image"} />
			</Menu.Trigger>
			<Menu.Content placement="bottom" showArrow className="sm:min-w-64">
				<Menu.Section>
					<Menu.Header separator>
						Username
						{/* <span className="block">{session?.user.name}</span> */}
					</Menu.Header>
				</Menu.Section>
				<Menu.Item href="/">
					<IconDashboard />
					<Menu.Label>Overview</Menu.Label>
				</Menu.Item>
				{/* <Menu.Item href="/settings">
					<IconSettings />
					<Menu.Label>Settings</Menu.Label>
				</Menu.Item> */}
				<Menu.Separator />

				<Menu.Submenu>
					<Menu.Item>
						{theme === "light" ? (
							<IconSun />
						) : theme === "dark" ? (
							<IconMoon />
						) : (
							<IconDeviceDesktop />
						)}
						<Menu.Label>Switch theme</Menu.Label>
					</Menu.Item>
					<Menu.Content>
						<Menu.Item onAction={() => setTheme("system")}>
							<IconDeviceDesktop /> System
						</Menu.Item>
						<Menu.Item onAction={() => setTheme("dark")}>
							<IconMoon /> Dark
						</Menu.Item>
						<Menu.Item onAction={() => setTheme("light")}>
							<IconSun /> Light
						</Menu.Item>
					</Menu.Content>
				</Menu.Submenu>
				<Menu.Separator />
				<Menu.Item>
					<Menu.Label>Contact Support</Menu.Label>
				</Menu.Item>
				<Menu.Separator />
				<Menu.Item
					onAction={async () => {
						// await authClient.signOut({
						// 	fetchOptions: {
						// 		onSuccess: () => {
						// 			// router.navigate("/auth/sign-in");
						// 		},
						// 	},
						// });
					}}
				>
					<IconLogout />
					<Menu.Label>Log out</Menu.Label>
				</Menu.Item>
			</Menu.Content>
		</Menu>
	);
}

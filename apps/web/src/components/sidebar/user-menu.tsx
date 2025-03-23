import { Avatar, Menu } from "../ui"
import { IconDashboard, IconDeviceDesktop, IconLogout, IconMoon, IconSun } from "justd-icons"

import { signOut } from "@/lib/auth/auth-client"
import { useAuth } from "@/lib/auth/use-auth"
import { useNavigate } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useTheme } from "../theme-provider"

export default function UserMenu() {
	const { theme, setTheme } = useTheme()
	const queryClient = useQueryClient()

	const navigate = useNavigate()
	const { data: session } = useAuth()

	return (
		<Menu>
			<Menu.Trigger className="ml-auto md:hidden" aria-label="Open Menu">
				<Avatar alt="User avatar" src={session?.user.image ?? ""} />
			</Menu.Trigger>
			<Menu.Content placement="bottom" showArrow className="sm:min-w-64">
				<Menu.Section>
					<Menu.Header separator>
						<span className="block">{session?.user.name}</span>
					</Menu.Header>
				</Menu.Section>
				<Menu.Item href="/">
					<IconDashboard />
					<Menu.Label>Dashboard</Menu.Label>
				</Menu.Item>
				{/* <Menu.Item href="/settings">
					<IconSettings />
					<Menu.Label>Settings</Menu.Label>
				</Menu.Item> */}
				<Menu.Separator />

				<Menu.Submenu>
					<Menu.Item>
						{theme === "light" ? <IconSun /> : theme === "dark" ? <IconMoon /> : <IconDeviceDesktop />}
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
						await signOut({
							fetchOptions: {
								onSuccess: () => {
									queryClient.removeQueries({ queryKey: ["auth"] })
									navigate({
										to: "/auth/sign-in",
									})
								},
							},
						})
					}}
				>
					<IconLogout />
					<Menu.Label>Log out</Menu.Label>
				</Menu.Item>
			</Menu.Content>
		</Menu>
	)
}

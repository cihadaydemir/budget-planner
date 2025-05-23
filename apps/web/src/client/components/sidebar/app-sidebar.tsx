"use client"

import {
	Avatar,
	Menu,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarItem,
	SidebarLabel,
	SidebarRail,
	SidebarSection,
	SidebarSectionGroup,
	useSidebar,
} from "../ui"
import { IconChevronLgDown, IconDashboard, IconHeadphones, IconLogout } from "@intentui/icons"
import { authClient, signOut } from "@/client/lib/auth/auth-client"
import { useLocation, useNavigate } from "@tanstack/react-router"

import { useAuth } from "@/client/lib/auth/use-auth"
import { usePockets } from "@/client/hooks/pockets/usePockets"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export default function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
	const queryClient = useQueryClient()
	const { setIsOpenOnMobile } = useSidebar()
	const location = useLocation()
	const currentPath = location.pathname
	const { data: pockets } = usePockets()
	const { data: session } = useAuth()
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarLabel className="font-medium">💰 Budget Planner</SidebarLabel>
			</SidebarHeader>
			<SidebarContent>
				<SidebarSectionGroup>
					<SidebarSection title="Pockets">
						<SidebarItem
							href="/"
							tooltip="Dashboard"
							isCurrent={"/" === currentPath}
							onPress={(e) => {
								setIsOpenOnMobile(false)
							}}
						>
							<IconDashboard />
							<SidebarLabel>Dashboard</SidebarLabel>
						</SidebarItem>
						{pockets?.map((pocket) => (
							<SidebarItem
								isCurrent={pocket.id === currentPath.split("/")[2]}
								key={pocket.id}
								onPress={(e) => {
									navigate({
										to: "/pocket/$pocketId",
										params: { pocketId: pocket.id },
									})
									setIsOpenOnMobile(false)
								}}
							>
								<SidebarLabel>{pocket.name}</SidebarLabel>
							</SidebarItem>
						))}
					</SidebarSection>
				</SidebarSectionGroup>
			</SidebarContent>

			<SidebarFooter>
				<Menu>
					<Menu.Trigger className="group" aria-label="Profile" data-slot="menu-trigger">
						<Avatar shape="square" src={session?.user.image} />
						<div className="in-data-[sidebar-collapsible=dock]:hidden text-sm">
							<SidebarLabel>{session?.user.name}</SidebarLabel>
							<span className="-mt-0.5 block text-muted-fg">{session?.user.email}</span>
						</div>
						<IconChevronLgDown
							data-slot="chevron"
							className="absolute right-3 size-4 transition-transform group-pressed:rotate-180"
						/>
					</Menu.Trigger>
					<Menu.Content placement="bottom right" className="sm:min-w-(--trigger-width)">
						<Menu.Section>
							<Menu.Header separator>
								<span className="block">{session?.user.name}</span>
							</Menu.Header>
						</Menu.Section>

						<Menu.Item href="/">
							<IconDashboard />
							Overview
						</Menu.Item>
						{/* <Menu.Item href="/settings">
							<IconSettings />
							Settings
						</Menu.Item> */}

						<Menu.Separator />

						<Menu.Item
							onAction={() => {
								// TODO: add link to mail
							}}
						>
							<IconHeadphones />
							Customer Support
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
							Log out
						</Menu.Item>
					</Menu.Content>
				</Menu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}

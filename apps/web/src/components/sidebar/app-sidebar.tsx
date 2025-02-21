"use client";

import {
	IconCar,
	IconChevronLgDown,
	IconDashboard,
	IconHeadphones,
	IconLogout,
	IconNotebookCover,
	IconReceipt2,
	IconSettings,
} from "justd-icons";
import { useLocation, useRouter } from "@tanstack/react-router";
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
} from "../ui";
import { usePockets } from "@/hooks/pockets/usePockets";

// import { authClient } from "~/lib/auth-client";

export default function AppSidebar(
	props: React.ComponentProps<typeof Sidebar>,
) {
	const location = useLocation();
	const currentPath = location.pathname;
	const { data: pockets } = usePockets();
	const router = useRouter();

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<div className="flex gap-2 items-center">
					{/* <IconCar className="size-5" /> */}
					<SidebarLabel className="font-medium">💰 Budget Planner</SidebarLabel>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarSectionGroup>
					<SidebarSection title="Pockets">
						<SidebarItem
							href="/"
							tooltip="Pockets"
							isCurrent={"/" === currentPath}
						>
							<IconDashboard />
							<SidebarLabel>Pockets</SidebarLabel>
						</SidebarItem>
						{pockets?.map((pocket) => (
							<SidebarItem
								key={pocket.id}
								onPress={(e) => {
									router.navigate({
										to: `/pocket/${pocket.id}`,
										params: { pocketId: pocket.id },
									});
								}}
							>
								{pocket.name}
							</SidebarItem>
						))}
					</SidebarSection>
				</SidebarSectionGroup>
			</SidebarContent>

			<SidebarFooter>
				<Menu>
					<Menu.Trigger
						className="group"
						aria-label="Profile"
						data-slot="menu-trigger"
					>
						<Avatar shape="square" src={"session?.user.image"} />
						<div className="in-data-[sidebar-collapsible=dock]:hidden text-sm">
							<SidebarLabel>
								{/* {session?.user.name} */}
								Username
							</SidebarLabel>
							<span className="-mt-0.5 block text-muted-fg">
								Email
								{/* {session?.user.email} */}
							</span>
						</div>
						<IconChevronLgDown
							data-slot="chevron"
							className="absolute right-3 size-4 transition-transform group-pressed:rotate-180"
						/>
					</Menu.Trigger>
					<Menu.Content
						placement="bottom right"
						className="sm:min-w-(--trigger-width)"
					>
						<Menu.Section>
							<Menu.Header separator>
								Username
								{/* <span className="block">{session?.user.name}</span> */}
							</Menu.Header>
						</Menu.Section>

						<Menu.Item href="/">
							<IconDashboard />
							Overview
						</Menu.Item>
						<Menu.Item href="/settings">
							<IconSettings />
							Settings
						</Menu.Item>

						<Menu.Separator />

						<Menu.Item href="#contact">
							<IconHeadphones />
							Customer Support
						</Menu.Item>
						<Menu.Separator />
						<Menu.Item
							onAction={async () => {
								// await authClient.signOut();
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
	);
}

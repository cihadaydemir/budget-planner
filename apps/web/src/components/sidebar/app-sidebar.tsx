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
import { useLocation, useParams, useRouter } from "@tanstack/react-router";
import {
	Avatar,
	Menu,
	Separator,
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
} from "../ui";
import { usePockets } from "@/hooks/pockets/usePockets";
import { authClient } from "@/lib/auth-client";

// import { authClient } from "~/lib/auth-client";

export default function AppSidebar(
	props: React.ComponentProps<typeof Sidebar>,
) {
	const { setIsOpenOnMobile } = useSidebar();
	const location = useLocation();
	const currentPath = location.pathname;
	const { data: pockets } = usePockets();
	const router = useRouter();
	const { data: session } = authClient.useSession();

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<div className="flex gap-2 items-center">
					<SidebarLabel className="font-medium">💰 Budget Planner</SidebarLabel>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarSectionGroup>
					<SidebarSection title="Pockets">
						<SidebarItem
							href="/"
							tooltip="Overview"
							isCurrent={"/" === currentPath}
							onPress={(e) => {
								setIsOpenOnMobile(false);
							}}
						>
							<IconDashboard />
							<SidebarLabel>Overview</SidebarLabel>
						</SidebarItem>
						{pockets?.map((pocket) => (
							<SidebarItem
								isCurrent={pocket.id === currentPath.split("/")[2]}
								key={pocket.id}
								onPress={(e) => {
									router.navigate({
										to: `/pocket/${pocket.id}`,
										params: { pocketId: pocket.id },
									});
									setIsOpenOnMobile(false);
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
					<Menu.Trigger
						className="group"
						aria-label="Profile"
						data-slot="menu-trigger"
					>
						<Avatar shape="square" src={session?.user.image} />
						<div className="in-data-[sidebar-collapsible=dock]:hidden text-sm">
							<SidebarLabel>{session?.user.name}</SidebarLabel>
							<span className="-mt-0.5 block text-muted-fg">
								{session?.user.email}
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
								<span className="block">{session?.user.name}</span>
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
								await authClient.signOut();
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

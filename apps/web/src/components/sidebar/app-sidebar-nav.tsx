import { SidebarNav, SidebarTrigger } from "../ui";
import UserMenu from "./user-menu";

export default function AppSidebarNav() {
	return (
		<SidebarNav>
			<span className="flex items-center gap-x-4">
				<SidebarTrigger className="-mx-2" />
			</span>
			<UserMenu />
		</SidebarNav>
	);
}

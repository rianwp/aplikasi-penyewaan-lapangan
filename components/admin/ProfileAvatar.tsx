import initialName from "@/utils/initialName"
import { Avatar, AvatarFallback } from "../ui/avatar"
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "../ui/menubar"
import { Separator } from "../ui/separator"
import ProfileInfo from "./ProfileInfo"
import { getAdminData } from "@/lib/http"
import { useQuery } from "@tanstack/react-query"

const ProfileAvatar = () => {
	const {
		data: adminData,
		isLoading: isAdminDataLoading,
		isError: isAdminDataError,
		error: adminDataError,
	} = useQuery({
		queryKey: ["adminData"],
		queryFn: () => getAdminData(),
	})
	return (
		<div className="">
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>
						<Avatar>
							<AvatarFallback>{initialName("Admin")}</AvatarFallback>
						</Avatar>
					</MenubarTrigger>
					<MenubarContent>
						<ProfileInfo name={"Admin"} email={"admin@gmail.com"} />
						<Separator />
						<MenubarItem>
							<button
								className="w-full flex flex-row justify-start"
								onClick={() => {}}
							>
								Logout
							</button>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	)
}

export default ProfileAvatar

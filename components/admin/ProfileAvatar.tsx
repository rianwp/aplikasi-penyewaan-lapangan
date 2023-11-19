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
import { getAdminData, logout } from "@/lib/http"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

const ProfileAvatar = () => {
	const { data: adminData, isLoading: isAdminDataLoading } = useQuery({
		queryKey: ["adminData"],
		queryFn: () => getAdminData(),
	})
	const { mutateAsync, isPending: isLogoutPending } = useMutation({
		mutationKey: ["logout"],
		mutationFn: logout,
	})

	const handleLogout = async () => {
		await mutateAsync()
		window.location.reload()
	}

	return (
		<Menubar>
			<MenubarMenu>
				<MenubarTrigger>
					<Avatar>
						<AvatarFallback>
							{initialName(adminData?.data.user.name || "")}
						</AvatarFallback>
					</Avatar>
				</MenubarTrigger>
				<MenubarContent>
					{isAdminDataLoading ? (
						<Loader2 className="h-5 w-5 animate-spin text-primary py-1" />
					) : (
						<ProfileInfo
							name={adminData?.data.user.name}
							email={adminData?.data.user.email}
						/>
					)}
					<Separator />
					<MenubarItem>
						<button
							className="w-full flex flex-row justify-start"
							onClick={handleLogout}
						>
							{isLogoutPending ? (
								<Loader2 className="h-5 w-5 animate-spin text-primary" />
							) : null}
							Logout
						</button>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	)
}

export default ProfileAvatar

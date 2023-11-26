import initialName from "@/utils/initialName"
import { Avatar, AvatarFallback } from "./ui/avatar"
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "./ui/menubar"
import { Separator } from "./ui/separator"
import ProfileInfo from "./ProfileInfo"
import { getAdminData, getUserData, logout } from "@/lib/http"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

interface ProfileAvatarPropsInterface {
	role: "admin" | "user"
}

const ProfileAvatar = ({ role }: ProfileAvatarPropsInterface) => {
	const { data, isLoading } = useQuery({
		queryKey: [role === "admin" ? "adminData" : "userData"],
		queryFn: () => (role === "admin" ? getAdminData() : getUserData()),
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
							{initialName(data?.data.user.name || "")}
						</AvatarFallback>
					</Avatar>
				</MenubarTrigger>
				<MenubarContent>
					{isLoading ? (
						<Loader2 className="h-5 w-5 animate-spin text-primary py-1" />
					) : (
						<ProfileInfo
							name={data?.data.user.name}
							email={data?.data.user.email}
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

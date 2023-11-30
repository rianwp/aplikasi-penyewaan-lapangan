import { Avatar, AvatarFallback } from "./ui/avatar"
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "./ui/menubar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "./ui/separator"
import ProfileInfo from "./ProfileInfo"
import { getAdminData, getUserData, logout } from "@/lib/http"
import { useMutation, useQuery } from "@tanstack/react-query"
import { List, Loader2, User2 } from "lucide-react"
import { Button, buttonVariants } from "./ui/button"
import Link from "next/link"
import Brand from "./user/Brand"

interface ProfileAvatarPropsInterface {
	role: "admin" | "user"
}

const ProfileAvatar = ({ role }: ProfileAvatarPropsInterface) => {
	const { data, isFetching } = useQuery({
		queryKey: [role === "admin" ? "adminData" : "userData"],
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchInterval: false,
		retry: 2,
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
		<>
			{role === "user" ? (
				<>
					{isFetching ? (
						<Avatar>
							<AvatarFallback>
								<Loader2 className="h-5 w-5 animate-spin text-primary" />
							</AvatarFallback>
						</Avatar>
					) : (
						<>
							{!data?.success ? (
								<>
									<a href="/auth/login" className="sm:block hidden">
										<Button variant="link">Login</Button>
									</a>
									<a href="/auth/register" className="sm:block hidden">
										<Button className="bg-client-primary hover:bg-red-800 ">
											Register
										</Button>
									</a>
									<Sheet>
										<SheetTrigger
											className={buttonVariants({
												variant: "link",
												className: "sm:hidden block",
											})}
										>
											<List />
										</SheetTrigger>
										<SheetContent className="w-[200px] max-w-full">
											<div className="w-full flex flex-col gap-y-2">
												<Brand />
												<a href="/auth/login">
													<Button className="w-full" variant="link">
														Login
													</Button>
												</a>
												<a href="/auth/register">
													<Button className="bg-client-primary hover:bg-red-800 w-full">
														Register
													</Button>
												</a>
											</div>
										</SheetContent>
									</Sheet>
								</>
							) : (
								<Menubar>
									<MenubarMenu>
										<MenubarTrigger>
											<Avatar>
												<AvatarFallback>
													<User2 className="text-gray-600" />
												</AvatarFallback>
											</Avatar>
										</MenubarTrigger>
										<MenubarContent>
											{isFetching ? (
												<Loader2 className="h-5 w-5 animate-spin text-primary py-1" />
											) : (
												<ProfileInfo
													name={data?.data.user.name}
													email={data?.data.user.email}
												/>
											)}
											<Separator />
											<MenubarItem>
												<Link
													className="w-full flex flex-row justify-start text-sm"
													href="/profile"
												>
													Profile
												</Link>
											</MenubarItem>
											<MenubarItem>
												<Link
													className="w-full flex flex-row justify-start text-sm"
													href="/booking"
												>
													Booking
												</Link>
											</MenubarItem>
											<MenubarItem>
												<button
													className="w-full flex flex-row justify-start text-sm"
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
							)}
						</>
					)}
				</>
			) : null}
			{role === "admin" ? (
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger>
							<Avatar>
								<AvatarFallback>
									<User2 className="text-gray-600" />
								</AvatarFallback>
							</Avatar>
						</MenubarTrigger>
						<MenubarContent>
							{isFetching ? (
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
									className="w-full flex flex-row justify-start text-sm"
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
			) : null}
		</>
	)
}

export default ProfileAvatar

"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import UserItem from "./UserItem"

interface UserLayoutPropsInterface {
	children: React.ReactNode
}

const UserLayout = ({ children }: UserLayoutPropsInterface) => {
	return (
		<div className="w-full lg:w-9/12 md:w-10/12 mx-auto px-5 md:py-10 py-5 flex flex-row items-center justify-center h-[calc(100vh-100px)]">
			<div className="border rounded-lg w-full flex flex-row h-full">
				<div className="p-4 md:w-1/5 md:flex flex-col gap-y-1 hidden border-r shrink-0">
					<UserItem link="/profile">Profile</UserItem>
					<UserItem link="/booking">Booking</UserItem>
				</div>
				{children}
				
			</div>
		</div>
	)
}

export default UserLayout

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import UserProfileForm from "./UserProfileForm"

const UserProfilePage = () => {
	return (
		<ScrollArea className="p-4 md:w-4/5 w-full">
			<div className="flex flex-col gap-y-4 px-2">
				<h1 className="font-semibold text-lg">Profile</h1>
				<UserProfileForm />
			</div>
			<ScrollBar orientation="vertical" />
		</ScrollArea>
	)
}

export default UserProfilePage

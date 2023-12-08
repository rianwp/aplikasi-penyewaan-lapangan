import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import UserProfileForm from "./UserProfileForm"

const UserProfilePage = () => {
	return (
		<div className="flex flex-col gap-y-4 py-4 md:w-4/5 w-full">
			<h1 className="font-semibold text-lg px-6">Profile</h1>
			<ScrollArea className="h-full w-full">
				<UserProfileForm />
				<ScrollBar orientation="vertical" />
			</ScrollArea>
		</div>
	)
}

export default UserProfilePage

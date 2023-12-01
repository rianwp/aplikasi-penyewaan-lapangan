import UserProfilePage from "@/components/user/user/profile/UserProfilePage"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Profile",
}

const Page = () => {
	return <UserProfilePage />
}

export default Page

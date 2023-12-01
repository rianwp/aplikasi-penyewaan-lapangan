import UserLayout from "@/components/user/user/UserLayout"
import authPage from "@/lib/authPage"
import { redirect } from "next/navigation"

interface LayoutPropsInterface {
	children: React.ReactNode
}

const Layout = async ({ children }: LayoutPropsInterface) => {
	const isAuthenticated = await authPage("user")
	if (!isAuthenticated) {
		redirect("/")
	}
	return <UserLayout>{children}</UserLayout>
}

export default Layout

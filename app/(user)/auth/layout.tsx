import authPage from "@/lib/authPage"
import { redirect } from "next/navigation"

interface LayoutPropsInterface {
	children: React.ReactNode
}

const Layout = async ({ children }: LayoutPropsInterface) => {
	const isAuthenticated = await authPage("user")
	if (isAuthenticated) {
		redirect("/")
	}
	return (
		<div className="w-screen h-screen flex justify-center items-center bg-auth bg-cover">
			{children}
		</div>
	)
}

export default Layout

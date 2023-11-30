import LoginPage from "@/components/admin/auth/login/LoginPage"
import authPage from "@/lib/authPage"
import { redirect } from "next/navigation"

const Page = async () => {
	const isAuthenticated = await authPage("admin")
	if (isAuthenticated) {
		redirect("/admin")
	}
	return <LoginPage />
}

export default Page

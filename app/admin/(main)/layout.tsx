import AdminLayout from "@/components/admin/AdminLayout"
import { redirect } from "next/navigation"
import authPage from "@/lib/authPage"

interface LayoutPropsInterface {
	children: React.ReactNode
}

const Layout = async ({ children }: LayoutPropsInterface) => {
	const isAuthenticated = await authPage("admin")
	if (!isAuthenticated) {
		redirect("/admin/auth/login")
	}
	return <AdminLayout>{children}</AdminLayout>
}

export default Layout

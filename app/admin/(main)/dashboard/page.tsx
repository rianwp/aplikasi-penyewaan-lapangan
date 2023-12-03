import DashboardPage from "@/components/admin/dashboard/DashboardPage"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Dashboard",
}

const Page = () => {
	return <DashboardPage />
}

export default Page

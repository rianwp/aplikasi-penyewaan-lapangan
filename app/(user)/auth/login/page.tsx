import LoginPage from "@/components/user/auth/LoginPage"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Login",
}

const Page = () => {
	return <LoginPage />
}

export default Page

import RegisterPage from "@/components/user/auth/RegisterPage"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Register",
}

const Page = () => {
	return <RegisterPage />
}

export default Page

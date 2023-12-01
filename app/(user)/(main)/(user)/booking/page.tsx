import UserBookingPage from "@/components/user/user/booking/UserBookingPage"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Booking",
}

const Page = () => {
	return <UserBookingPage />
}

export default Page

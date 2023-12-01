import BookingPage from "@/components/admin/booking/BookingPage"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Booking",
}

const Page = () => {
	return <BookingPage />
}

export default Page

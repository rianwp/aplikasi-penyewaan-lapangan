import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ListBooking from "./ListBooking"

const UserBookingPage = () => {
	return (
		<div className="flex flex-col gap-y-4 py-4 md:w-4/5 w-full">
			<h1 className="font-semibold text-lg px-6">Booking</h1>
			<ScrollArea className="h-full w-full">
				<ListBooking />
				<ScrollBar orientation="vertical" />
			</ScrollArea>
		</div>
	)
}

export default UserBookingPage

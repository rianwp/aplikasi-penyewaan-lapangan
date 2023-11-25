import Breadcrumb from "../Breadcrumb"
import BookingData from "./BookingData"

const BookingPage = () => {
	return (
		<>
			<h1 className="font-semibold text-4xl text-system-text-primary mb-5">
				Booking
			</h1>
			<Breadcrumb name="Booking" />
			<BookingData />
		</>
	)
}

export default BookingPage

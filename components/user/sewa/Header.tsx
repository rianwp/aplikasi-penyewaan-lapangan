import { buttonVariants } from "@/components/ui/button"

const Header = () => {
	return (
		<div className="w-full bg-hero-banner bg-cover flex flex-col items-center justify-center py-32 gap-y-5 px-10">
			<h1 className="text-white font-bold text-3xl text-center">
				BOOKING LAPANGAN JADI LEBIH GAMPANG DI MARGAJAYA
			</h1>
			<a href="#booking" className={buttonVariants()}>
				Segera Booking
			</a>
		</div>
	)
}

export default Header

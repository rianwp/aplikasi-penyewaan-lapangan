"use client"

import { useRecoilState } from "recoil"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import BookingConfirmation from "./BookingConfirmation"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { isBookingOpenState } from "@/store/app-store"

interface MainLayoutPropsInterface {
	children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutPropsInterface) => {
	const [isBookingOpen, setIsBookingOpen] = useRecoilState(isBookingOpenState)
	return (
		<>
			<Navbar />
			{isBookingOpen ? (
				<BookingConfirmation
					isOpen={isBookingOpen}
					onOpenChange={setIsBookingOpen}
				/>
			) : null}
			<div className="mt-16 min-h-[calc(100vh-100px)]">{children}</div>
			<Footer />
		</>
	)
}

export default MainLayout

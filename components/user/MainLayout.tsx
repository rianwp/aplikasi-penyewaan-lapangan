"use client"

import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import Footer from "./Footer"
import Navbar from "./Navbar"

interface MainLayoutPropsInterface {
	children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutPropsInterface) => {
	return (
		<>
			<Navbar />
			<div className="mt-16 min-h-[calc(100vh-100px)]">{children}</div>
			<Footer />
		</>
	)
}

export default MainLayout

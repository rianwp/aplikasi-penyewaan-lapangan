"use client"

import Navbar from "@/components/admin/Navbar"
import Sidebar from "@/components/admin/Sidebar"
import { useState } from "react"

interface AdminLayoutPropsInterface {
	children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutPropsInterface) => {
	const [openSidebar, setOpenSidebar] = useState(false)

	const openSidebarClassName = openSidebar
		? "translate-x-full"
		: "translate-x-0"
	return (
		<div className="overflow-hidden">
			<Navbar onOpenSidebar={() => setOpenSidebar(true)} />
			<div
				className={`${openSidebarClassName} fixed md:top-16 top-0 md:left-0 sm:w-[300px] w-full sm:-left-[300px] -left-full md:translate-x-0 shrink-0 md:h-[calc(100vh-64px)] h-screen transition md:transition-none duration-300 z-50`}
			>
				<Sidebar onClose={() => setOpenSidebar(false)} />
			</div>
			<div className="mt-16 p-5 bg-[#F0F4F7] md:ml-[300px] ml-0 overflow-y-auto w-full md:w-[calc(100%-300px)] min-h-[calc(100vh-64px)]">
				{children}
			</div>
		</div>
	)
}

export default AdminLayout

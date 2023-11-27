"use client"

import Footer from "./Footer"
import Navbar from "./Navbar"
import { RecoilRoot } from "recoil"

interface MainLayoutPropsInterface {
	children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutPropsInterface) => {
	return (
		<RecoilRoot>
			<Navbar />
			<div className="mt-16">{children}</div>
			<Footer />
		</RecoilRoot>
	)
}

export default MainLayout

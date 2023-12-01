import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Dashboard",
}

const Page = () => {
	return (
		<>
			<h1 className="font-semibold text-4xl text-system-text-primary">
				Dashboard
			</h1>
		</>
	)
}

export default Page

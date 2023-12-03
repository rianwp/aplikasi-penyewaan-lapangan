import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Laporan",
}

const Page = () => {
	return (
		<>
			<h1 className="font-semibold text-4xl text-system-text-primary">
				Laporan
			</h1>
		</>
	)
}

export default Page

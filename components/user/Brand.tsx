import brandImg from "@/public/logodb.png"
import Link from "next/link"

const Brand = () => {
	return (
		<Link href="/" className="flex flex-row items-center h-full gap-x-2">
			<img src={brandImg.src} className="h-8" />
			<p className="text-black font-bold">MARGAJAYA</p>
		</Link>
	)
}

export default Brand

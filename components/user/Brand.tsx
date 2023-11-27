import brandImg from "@/public/logodb.png"

const Brand = () => {
	return (
		<a href="/" className="flex flex-row items-center h-full gap-x-2">
			<img src={brandImg.src} className="h-8" />
			<p className="text-black font-bold">Margajaya</p>
		</a>
	)
}

export default Brand

import { buttonVariants } from "@/components/ui/button"
import { COOKIE_PAYMENT_STATUS } from "@/constants"
import { cookies } from "next/headers"

const Page = async () => {
	const status = cookies().get(COOKIE_PAYMENT_STATUS)?.value
	return (
		<div className="w-full min-h-[calc(100vh-100px)] flex justify-center items-center">
			<div className="md:w-1/2 w-4/5 text-center">
				{status === "success" ? (
					<h1 className="text-3xl font-bold mb-4 text-green-500">
						Pembayaran Berhasil
					</h1>
				) : (
					<h1 className="text-3xl font-bold mb-4 text-client-primary">
						Pembayaran Tidak Terselesaikan
					</h1>
				)}
				<a className={buttonVariants({ variant: "link" })} href="/">
					Kembali Ke Halaman Utama
				</a>
			</div>
		</div>
	)
}

export default Page

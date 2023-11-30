import { buttonVariants } from "@/components/ui/button"
import { COOKIE_PAYMENT_STATUS } from "@/constants"
import { cn } from "@/lib/shadcnUtils"
import { cookies } from "next/headers"

const deleteCookies = async () => {
	await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/reset`)
}

const Page = async () => {
	const status = cookies().get(COOKIE_PAYMENT_STATUS)?.value as
		| "success"
		| "pending"
		| "failed"
		| undefined

	const message = {
		success: {
			message: "Pembayaran Berhasil",
			color: "text-green-500",
		},
		pending: {
			message: "Pembayaran Sedang Diproses",
			color: "text-yellow-500",
		},
		failed: {
			message: "Pembayaran Gagal",
			color: "text-red-500",
		},
	}

	await deleteCookies()

	return (
		<div className="w-full min-h-[calc(100vh-100px)] flex justify-center items-center">
			<div className="md:w-1/2 w-4/5 text-center">
				{status ? (
					<h1
						className={cn(["text-3xl font-bold mb-4", message[status].color])}
					>
						{message[status].message}
					</h1>
				) : (
					<h1 className="text-3xl font-bold mb-4 text-red-500">
						Tidak Terdeteksi Pembayaran
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

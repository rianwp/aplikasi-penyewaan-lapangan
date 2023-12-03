import { buttonVariants } from "@/components/ui/button"
import { FAILED_TRANSACTION, SUCCESS_TRANSACTION } from "@/constants"
import { cn } from "@/lib/shadcnUtils"
import { Metadata } from "next"
import { $Enums } from "@prisma/client"

export const metadata: Metadata = {
	title: "Payment Status",
}

const Page = async ({
	searchParams,
}: {
	searchParams?: {
		transaction_status?: $Enums.TransactionStatus
	}
}) => {
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

	const status = () => {
		if (searchParams?.transaction_status) {
			if (SUCCESS_TRANSACTION.includes(searchParams?.transaction_status)) {
				return "success"
			}
			if (FAILED_TRANSACTION.includes(searchParams?.transaction_status)) {
				return "failed"
			}
			if (searchParams?.transaction_status === "pending") {
				return "pending"
			}
		}
		return undefined
	}

	return (
		<div className="w-full min-h-[calc(100vh-100px)] flex justify-center items-center">
			<div className="md:w-1/2 w-4/5 text-center">
				{status ? (
					<h1
						className={cn([
							"text-3xl font-bold mb-4",
							message[status() as "success" | "failed" | "pending"].color,
						])}
					>
						{message[status() as "success" | "failed" | "pending"].message}
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

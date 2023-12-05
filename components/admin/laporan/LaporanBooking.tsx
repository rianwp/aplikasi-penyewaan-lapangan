"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { currentDateTZ } from "@/constants"
import { getBooking } from "@/lib/http"
import { BookingResponseInterface } from "@/types/BookingInterface"
import formatCurrency from "@/utils/formatCurrency"
import formatDate from "@/utils/formatDate"
import { useMutation } from "@tanstack/react-query"
import { ArrowDownToLineIcon, Loader2 } from "lucide-react"
import { useEffect } from "react"
import * as XLSX from "xlsx"

const LaporanBooking = () => {
	const { toast } = useToast()

	const {
		mutate,
		data: dataBooking,
		isPending,
		isError,
		error,
		isIdle,
	} = useMutation({
		mutationKey: ["getBooking"],
		mutationFn: () => getBooking(),
	})

	const responseData =
		(dataBooking?.data.booking as BookingResponseInterface[]) ?? []

	useEffect(() => {
		if (!isPending && !isIdle) {
			if (isError) {
				toast({
					title: "Terjadi Kesalahan",
					description: error?.message ?? "",
					variant: "destructive",
				})
			} else {
				convertJsonToExcel(
					responseData.map((data) => {
						return {
							"Order Id": data.id,
							"Atas Nama": data.name,
							"Jenis Lapangan": data.jenis_lapangan,
							"Jam Mulai": data.jam_mulai,
							"Jam Berakhir": data.jam_berakhir,
							Harga: `Rp. ${formatCurrency(data.harga)}`,
							"Status Pembayaran": data.status,
							"Tipe Payment": data.payment_type,
							"Tanggal Transaksi": data.transaction_time
								? formatDate(new Date(data.transaction_time), true)
								: "",
							"Tanggal Booking": formatDate(new Date(data.tanggal), true),
						}
					})
				)
			}
		}
	}, [isPending, isError, isIdle])

	const convertJsonToExcel = async (data: any[]) => {
		const ws = XLSX.utils.json_to_sheet(data)
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
		XLSX.writeFile(wb, `Laporan_${formatDate(currentDateTZ, true)}.xlsx`)
	}

	return (
		<div className="mt-5">
			<Button
				className="flex flex-row gap-x-2"
				disabled={isPending}
				onClick={() => mutate()}
				variant="outline"
			>
				{isPending ? (
					<Loader2 className="h-5 w-5 animate-spin text-primary" />
				) : (
					<ArrowDownToLineIcon className="h-5 w-5 text-primary" />
				)}
				<p>Download Laporan</p>
			</Button>
		</div>
	)
}

export default LaporanBooking

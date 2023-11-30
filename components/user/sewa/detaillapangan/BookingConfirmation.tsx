import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { addBooking } from "@/lib/http"
import { currentOrderState } from "@/store/app-store"
import { BookingRequestInterface } from "@/types/BookingInterface"
import formatCurrency from "@/utils/formatCurrency"
import formatDate from "@/utils/formatDate"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"

interface BookingConfirmationPropsInterface {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const BookingConfirmation = ({
	isOpen,
	onOpenChange,
}: BookingConfirmationPropsInterface) => {
	const queryClient = useQueryClient()
	const currentOrder = useRecoilValue(currentOrderState)

	const { mutate, data, isPending, isError, error, isIdle } = useMutation({
		mutationKey: ["addBooking"],
		mutationFn: (data: BookingRequestInterface) => addBooking(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getBooking"] })
			queryClient.invalidateQueries({ queryKey: ["getLapangan"] })
		},
	})

	useEffect(() => {
		if (!isPending && !isIdle) {
			if (isError) {
				toast({
					title: "Terjadi Kesalahan",
					description: error?.message ?? "",
					variant: "destructive",
				})
			} else {
				const redirectUrl = data.data.redirectUrl
				window.location.replace(redirectUrl)
			}
		}
	}, [isPending, isError, isIdle])

	return (
		<Dialog open={isOpen} onOpenChange={(open) => onOpenChange(open)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Konfirmasi Booking</DialogTitle>
					<DialogDescription>
						Konfirmasi Pembayaran untuk Booking
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-y-4 py-4">
					<div className="flex flex-row justify-between items-center gap-4">
						<Label>Jenis Lapangan</Label>
						<p className="font-bold text-sm">{currentOrder.jenis_lapangan}</p>
					</div>
					<div className="flex flex-row justify-between items-center gap-4">
						<Label>Sesi Lapangan</Label>
						<p className="font-bold text-sm">
							{currentOrder.jam_mulai} - {currentOrder.jam_berakhir}
						</p>
					</div>
					<div className="flex flex-row justify-between items-start gap-4">
						<Label>Harga</Label>
						<p className="font-bold text-xl">
							Rp. {formatCurrency(currentOrder.harga)}
						</p>
					</div>
				</div>
				<DialogFooter>
					<Button
						disabled={isPending}
						onClick={() =>
							mutate({
								id_lapangan: currentOrder.id_lapangan,
								tanggal: currentOrder.tanggal,
							})
						}
						className="w-full bg-client-primary hover:bg-red-800 flex flex-row gap-x-2"
					>
						{isPending ? (
							<Loader2 className="h-5 w-5 animate-spin text-white" />
						) : null}
						Pesan
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default BookingConfirmation

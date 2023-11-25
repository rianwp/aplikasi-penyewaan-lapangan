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
import { useToast } from "@/components/ui/use-toast"
import { editBooking } from "@/lib/http"
import {
	BookingRequestInterface,
	BookingResponseInterface,
} from "@/types/BookingInterface"
import handleObjectState from "@/utils/handleObjectState"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import SelectLapangan from "./SelectLapangan"
import DatePicker from "@/components/DatePicker"

interface EditBookingPropsInterface {
	currentData: BookingResponseInterface
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const EditBooking = ({
	currentData,
	isOpen,
	onOpenChange,
}: EditBookingPropsInterface) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const { mutate, data, isPending, isError, error, isIdle } = useMutation({
		mutationKey: ["editBooking"],
		mutationFn: (data: { id: string; dataBooking: BookingRequestInterface }) =>
			editBooking(data.id, {
				tanggal: data.dataBooking.tanggal,
				id_lapangan: data.dataBooking.id_lapangan,
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["getBooking"] }),
	})

	const [inputForm, setInputForm] = useState<BookingRequestInterface>({
		tanggal: currentData.tanggal,
		id_lapangan: currentData.id,
	})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setInputForm({
			tanggal: currentData.tanggal,
			id_lapangan: currentData.id,
		})
		setIsLoading(false)
	}, [currentData])

	useEffect(() => {
		if (!isPending && !isIdle) {
			if (isError) {
				toast({
					title: "Terjadi Kesalahan",
					description: error?.message ?? "",
					variant: "destructive",
				})
			} else {
				toast({
					title: "Sukses",
					description: data.message,
				})
			}
		}
	}, [isPending, isError, isIdle])

	return (
		<Dialog
			open={isOpen && !isLoading}
			onOpenChange={(open) => onOpenChange(open)}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Data</DialogTitle>
					<DialogDescription>Edit Booking</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-y-4 py-4">
					<div className="flex sm:flex-row flex-col items-center gap-4">
						<Label htmlFor="tanggal" className="sm:text-right sm:w-1/4 w-full">
							Tanggal
						</Label>
						<DatePicker
							htmlId="tanggal"
							date={new Date(inputForm.tanggal)}
							className="sm:w-3/4 w-full shrink-0"
							onDateChange={(date) =>
								handleObjectState(
									"tanggal",
									(date as Date).toLocaleDateString("id-ID"),
									setInputForm
								)
							}
						/>
					</div>
					<div className="flex sm:flex-row flex-col items-center gap-4">
						<Label
							htmlFor="id_lapangan"
							className="sm:text-right sm:w-1/4 w-full"
						>
							Lapangan
						</Label>
						<SelectLapangan
							value={inputForm.id_lapangan}
							onValueChange={(value) =>
								handleObjectState("id_lapangan", value, setInputForm)
							}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						disabled={isPending}
						onClick={() =>
							mutate({ id: currentData.id, dataBooking: inputForm })
						}
						className="bg-system-button-primary hover:bg-system-button-primary_hover flex flex-row gap-x-2"
						type="button"
					>
						{isPending ? (
							<Loader2 className="h-5 w-5 animate-spin text-white" />
						) : null}
						<p>Simpan</p>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default EditBooking

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
import { addBooking } from "@/lib/http"
import { BookingRequestInterface } from "@/types/BookingInterface"
import handleObjectState from "@/utils/handleObjectState"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import SelectLapangan from "./SelectLapangan"
import DatePicker from "@/components/DatePicker"
import formatDate from "@/utils/formatDate"
import { Input } from "@/components/ui/input"
import { currentDateTZ } from "@/constants"

interface AddBookingPropsInterface {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const AddBooking = ({ isOpen, onOpenChange }: AddBookingPropsInterface) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const { mutate, data, isPending, isError, error, isIdle } = useMutation({
		mutationKey: ["addBooking"],
		mutationFn: (data: BookingRequestInterface) => addBooking(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getBooking"] })
			queryClient.invalidateQueries({ queryKey: ["getLapangan"] })
		},
	})

	const [inputForm, setInputForm] = useState<BookingRequestInterface>({
		tanggal: formatDate(new Date()),
		id_lapangan: "",
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
				toast({
					title: "Sukses",
					description: data.message,
				})
			}
		}
	}, [isPending, isError, isIdle])

	return (
		<Dialog open={isOpen} onOpenChange={(open) => onOpenChange(open)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tambah Data</DialogTitle>
					<DialogDescription>Tambahkan Booking</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-y-4 py-4">
					<div className="flex sm:flex-row flex-col items-center gap-4">
						<Label htmlFor="name" className="sm:text-right sm:w-1/4 w-full">
							Atas Nama
						</Label>
						<Input
							type="text"
							id="name"
							placeholder="Masukkan Nama"
							autoComplete="off"
							value={inputForm.name}
							onChange={(e) =>
								handleObjectState("name", e.target.value, setInputForm)
							}
							className="sm:w-3/4 w-full shrink-0"
						/>
					</div>
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
									formatDate(new Date(date as Date)),
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
							className="sm:w-3/4 w-full shrink-0"
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
						onClick={() => mutate(inputForm)}
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

export default AddBooking

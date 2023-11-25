import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { editSesiLapangan } from "@/lib/http"
import {
	SesiLapanganRequestInterface,
	SesiLapanganResponseInterface,
} from "@/types/SesiLapanganInterface"
import handleObjectState from "@/utils/handleObjectState"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

interface EditSesiLapanganPropsInterface {
	currentData: SesiLapanganResponseInterface
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const EditSesiLapangan = ({
	currentData,
	isOpen,
	onOpenChange,
}: EditSesiLapanganPropsInterface) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const { mutate, data, isPending, isError, error, isIdle } = useMutation({
		mutationKey: ["editSesiLapangan"],
		mutationFn: (data: {
			id: string
			dataSesiLapangan: SesiLapanganRequestInterface
		}) =>
			editSesiLapangan(data.id, {
				jam_mulai: data.dataSesiLapangan.jam_mulai,
				jam_berakhir: data.dataSesiLapangan.jam_berakhir,
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["getSesiLapangan"] }),
	})

	const [inputForm, setInputForm] =
		useState<SesiLapanganRequestInterface>(currentData)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setInputForm(currentData)
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
					<DialogDescription>Edit Sesi Lapangan</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-y-4 py-4">
					<div className="flex sm:flex-row flex-col items-center gap-4">
						<Label
							htmlFor="jam_mulai"
							className="sm:text-right sm:w-1/4 w-full"
						>
							Jam Mulai
						</Label>
						<Input
							type="time"
							id="jam_mulai"
							placeholder="Masukkan Jam Mulai"
							value={inputForm.jam_mulai}
							onChange={(e) =>
								handleObjectState("jam_mulai", e.target.value, setInputForm)
							}
							className="sm:w-3/4 w-full shrink-0"
						/>
					</div>
					<div className="flex sm:flex-row flex-col items-center gap-4">
						<Label
							htmlFor="jam_berakhir"
							className="sm:text-right sm:w-1/4 w-full"
						>
							Jam Berakhir
						</Label>
						<Input
							type="time"
							id="jam_berakhir"
							placeholder="Masukkan Jam Berakhir"
							value={inputForm.jam_berakhir}
							onChange={(e) =>
								handleObjectState("jam_berakhir", e.target.value, setInputForm)
							}
							className="sm:w-3/4 w-full shrink-0"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						disabled={isPending}
						onClick={() =>
							mutate({ id: currentData.id, dataSesiLapangan: inputForm })
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

export default EditSesiLapangan

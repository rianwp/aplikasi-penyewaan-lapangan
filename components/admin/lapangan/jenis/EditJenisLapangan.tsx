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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { editJenisLapangan } from "@/lib/http"
import { JenisLapanganResponseInterface } from "@/types/JenisLapanganInterface"
import handleObjectState from "@/utils/handleObjectState"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

interface EditJenisLapanganPropsInterface {
	currentData: JenisLapanganResponseInterface
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const EditJenisLapangan = ({
	currentData,
	isOpen,
	onOpenChange,
}: EditJenisLapanganPropsInterface) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const { mutate, data, isPending, isError, error, isIdle } = useMutation({
		mutationKey: ["editJenisLapangan"],
		mutationFn: (data: JenisLapanganResponseInterface) =>
			editJenisLapangan(data.id, {
				images: data.images,
				jenis_lapangan: data.jenis_lapangan,
				deskripsi: data.deskripsi,
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["getJenisLapangan"] }),
	})

	const [inputForm, setInputForm] = useState(currentData)
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
					description: error.message,
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
					<DialogDescription>Edit Jenis Lapangan</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-y-4 py-4">
					<div className="flex sm:flex-row flex-col items-center gap-4">
						<Label
							htmlFor="jenis_lapangan"
							className="sm:text-right sm:w-1/4 w-full"
						>
							Jenis Lapangan
						</Label>
						<Input
							type="text"
							id="jenis_lapangan"
							placeholder="Masukkan Jenis Lapangan"
							value={inputForm.jenis_lapangan}
							onChange={(e) =>
								handleObjectState(
									"jenis_lapangan",
									e.target.value,
									setInputForm
								)
							}
							className="sm:w-3/4 w-full shrink-0"
						/>
					</div>
					<div className="flex sm:flex-row flex-col items-center gap-4">
						<Label
							htmlFor="deskripsi"
							className="sm:text-right sm:w-1/4 w-full"
						>
							Deskripsi
						</Label>
						<Textarea
							id="deskripsi"
							placeholder="Masukkan Deskrpsi"
							value={inputForm.deskripsi}
							onChange={(e) =>
								handleObjectState("deskripsi", e.target.value, setInputForm)
							}
							className="sm:w-3/4 w-full shrink-0"
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

export default EditJenisLapangan

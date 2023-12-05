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
import { editLapangan } from "@/lib/http"
import {
	LapanganRequestInterface,
	LapanganResponseInterface,
} from "@/types/LapanganInterface"
import handleObjectState from "@/utils/handleObjectState"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"
import SelectJenisLapangan from "../../../SelectJenisLapangan"
import SelectSesiLapangan from "../../../SelectSesiLapangan"
import handleNegativeNumber from "@/utils/handleNegativeNumber"

interface EditLapanganPropsInterface {
	currentData: LapanganResponseInterface
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const EditLapangan = ({
	currentData,
	isOpen,
	onOpenChange,
}: EditLapanganPropsInterface) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const { mutate, data, isPending, isError, error, isIdle } = useMutation({
		mutationKey: ["editLapangan"],
		mutationFn: (data: {
			id: string
			dataLapangan: LapanganRequestInterface
		}) =>
			editLapangan(data.id, {
				harga: data.dataLapangan.harga,
				id_jenislap: data.dataLapangan.id_jenislap,
				id_sesilap: data.dataLapangan.id_sesilap,
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["getLapangan"] }),
	})

	const [inputForm, setInputForm] = useState<LapanganRequestInterface>({
		harga: currentData.harga,
		id_jenislap: currentData.JenisLapangan.id,
		id_sesilap: currentData.SesiLapangan.id,
	})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setInputForm({
			harga: currentData.harga,
			id_jenislap: currentData.JenisLapangan.id,
			id_sesilap: currentData.SesiLapangan.id,
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
					<DialogDescription>Edit Lapangan</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-y-4 py-4">
					<div className="flex sm:flex-row flex-col items-center gap-4">
						<Label htmlFor="harga" className="sm:text-right sm:w-1/4 w-full">
							Harga
						</Label>
						<div className="sm:w-3/4 w-full shrink-0 flex flex-row gap-x-2 items-center">
							<p className="shrink-0">Rp</p>
							<Input
								type="number"
								id="harga"
								placeholder="Masukkan Harga"
								autoComplete="off"
								value={inputForm.harga}
								onChange={(e) =>
									handleObjectState(
										"harga",
										handleNegativeNumber(e.target.value),
										setInputForm
									)
								}
								className="w-full"
							/>
						</div>
					</div>
					<div className="flex sm:flex-row flex-col items-center gap-4">
						<Label
							htmlFor="id_jenislap"
							className="sm:text-right sm:w-1/4 w-full"
						>
							Jenis Lapangan
						</Label>
						<SelectJenisLapangan
							className="sm:w-3/4 w-full shrink-0"
							value={inputForm.id_jenislap}
							onValueChange={(value) =>
								handleObjectState("id_jenislap", value, setInputForm)
							}
						/>
					</div>
					<div className="flex sm:flex-row flex-col items-center gap-4">
						<Label
							htmlFor="id_sesilap"
							className="sm:text-right sm:w-1/4 w-full"
						>
							Sesi Lapangan
						</Label>
						<SelectSesiLapangan
							className="sm:w-3/4 w-full shrink-0"
							value={inputForm.id_sesilap}
							onValueChange={(value) =>
								handleObjectState("id_sesilap", value, setInputForm)
							}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						disabled={isPending}
						onClick={() =>
							mutate({
								id: currentData.id,
								dataLapangan: {
									...inputForm,
									harga: Number(inputForm.harga),
								},
							})
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

export default EditLapangan

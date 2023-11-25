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
import { addLapangan } from "@/lib/http"
import { LapanganRequestInterface } from "@/types/LapanganInterface"
import handleObjectState from "@/utils/handleObjectState"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"
import SelectJenisLapangan from "./SelectJenisLapangan"
import SelectSesiLapangan from "./SelectSesiLapangan"

interface AddLapanganPropsInterface {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const AddLapangan = ({ isOpen, onOpenChange }: AddLapanganPropsInterface) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const { mutate, data, isPending, isError, error, isIdle } = useMutation({
		mutationKey: ["addLapangan"],
		mutationFn: (data: LapanganRequestInterface) => addLapangan(data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["getLapangan"] }),
	})

	const [inputForm, setInputForm] = useState<LapanganRequestInterface>({
		harga: 0,
		id_jenislap: "",
		id_sesilap: "",
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

	const handleHargaChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (Number(e.target.value) < 0) {
			handleObjectState("harga", 0, setInputForm)
			return
		}
		handleObjectState("harga", Number(e.target.value), setInputForm)
	}

	return (
		<Dialog open={isOpen} onOpenChange={(open) => onOpenChange(open)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tambah Data</DialogTitle>
					<DialogDescription>Tambahkan Lapangan</DialogDescription>
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
								onChange={(e) => handleHargaChange(e)}
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

export default AddLapangan

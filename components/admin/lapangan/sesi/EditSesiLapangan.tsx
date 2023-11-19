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

interface EditSesiLapanganPropsInterface {
	currentData: SesiLapanganInterface
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const EditSesiLapangan = ({
	currentData,
	isOpen,
	onOpenChange,
}: EditSesiLapanganPropsInterface) => {
	return (
		<Dialog open={isOpen} onOpenChange={(open) => onOpenChange(open)}>
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
							defaultValue={currentData.jam_mulai}
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
							defaultValue={currentData.jam_berakhir}
							className="sm:w-3/4 w-full shrink-0"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						className="bg-system-button-primary hover:bg-system-button-primary_hover"
						type="button"
					>
						Simpan
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default EditSesiLapangan

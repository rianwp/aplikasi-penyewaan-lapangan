import { BsPlus } from "react-icons/bs"
import { Button } from "./ui/button"
import LapanganCard from "./LapanganCard"
import { LapanganResponseInterface } from "@/types/LapanganInterface"
import { Loader2 } from "lucide-react"

interface LapanganLayoutPropsInterface {
	onAdd?: () => void
	onEdit?: (id: string) => void
	onDelete?: (id: string) => void
	dataLapangan: LapanganResponseInterface[]
	isLoading: boolean
}

const LapanganLayout = ({
	onAdd,
	onEdit,
	onDelete,
	dataLapangan,
	isLoading,
}: LapanganLayoutPropsInterface) => {
	return (
		<div className="flex flex-col gap-y-2">
			{onAdd ? (
				<Button
					onClick={onAdd}
					className="w-fit flex flex-row items-center gap-x-1 bg-system-button-primary hover:bg-system-button-primary_hover text-white self-end"
					size="sm"
				>
					<BsPlus className="w-5 h-5" />
					<p>Tambah</p>
				</Button>
			) : null}
			{isLoading ? (
				<div className="w-full flex flex-row justify-center items-center h-40">
					<Loader2 className="h-10 w-10 animate-spin text-system-primary" />
				</div>
			) : (
				<>
					<p className="text-black">Menampilkan {dataLapangan.length} data</p>
					<div className="w-[calc(100%+32px)] -ml-4 flex flex-row flex-wrap">
						{dataLapangan.map((data) => {
							return (
								<LapanganCard
									onEdit={() => onEdit?.(data.id)}
									onDelete={() => onDelete?.(data.id)}
									dataLapangan={data}
									key={data.id}
								/>
							)
						})}
					</div>
				</>
			)}
		</div>
	)
}

export default LapanganLayout

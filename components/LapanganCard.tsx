import { LapanganResponseInterface } from "@/types/LapanganInterface"
import { Button, buttonVariants } from "./ui/button"
import { BsPencilFill, BsTrash } from "react-icons/bs"
import Link from "next/link"
import formatCurrency from "@/utils/formatCurrency"
import no_image from "@/public/no-image.png"

interface LapanganCardPropsInterface {
	dataLapangan: LapanganResponseInterface
	onEdit?: () => void
	onDelete?: () => void
	link?: string
}

const LapanganCard = ({
	dataLapangan,
	onEdit,
	onDelete,
	link,
}: LapanganCardPropsInterface) => {
	return (
		<div className="p-4 lg:w-1/3 sm:w-1/2 w-full">
			<div className="relative h-full w-full rounded-lg border bg-primary-foreground overflow-hidden z-0">
				{dataLapangan.available !== undefined ? (
					<div className="absolute top-2 left-2 bg-primary-foreground border rounded-full px-3 py-2 text-sm font-semibold">
						{dataLapangan.available === false ? "TIDAK TERSEDIA" : "TERSEDIA"}
					</div>
				) : null}
				<img
					src={dataLapangan.JenisLapangan.Image[0]?.imageUrl ?? no_image.src}
					className="aspect-video w-full object-cover"
				/>
				<div className="p-3 flex flex-row justify-between items-start">
					<div className="flex flex-col w-full">
						<h1 className="font-semibold text-lg">
							{dataLapangan.JenisLapangan.jenis_lapangan}
						</h1>
						<p className="text-sm">
							{dataLapangan.SesiLapangan.jam_mulai} -{" "}
							{dataLapangan.SesiLapangan.jam_berakhir}
						</p>
						<p className="text-sm">Rp. {formatCurrency(dataLapangan.harga)}</p>
						{link ? (
							<div className="self-end">
								<Link href={link} className={buttonVariants()}>
									Lihat
								</Link>
							</div>
						) : null}
					</div>
					{dataLapangan.available === undefined ? (
						<div className="flex flex-row gap-x-1">
							<Button
								className="h-8 w-8"
								onClick={onDelete}
								size="icon"
								variant="destructive"
							>
								<BsTrash />
							</Button>
							<Button
								className="h-8 w-8"
								onClick={onEdit}
								size="icon"
								variant="outline"
							>
								<BsPencilFill />
							</Button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default LapanganCard

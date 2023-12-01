import { FAILED_TRANSACTION, SUCCESS_TRANSACTION } from "@/constants"
import { cn } from "@/lib/shadcnUtils"
import { BookingResponseInterface } from "@/types/BookingInterface"
import formatDate from "@/utils/formatDate"
import statusColor from "@/utils/statusColor"
import { $Enums } from "@prisma/client"

interface ItemBookingPropsInterface {
	data: BookingResponseInterface
}

const ItemBooking = ({ data }: ItemBookingPropsInterface) => {
	return (
		<div className="w-full p-4 rounded-lg border flex flex-col gap-y-4 bg-white">
			<div className="flex fex-row justify-between">
				<div className="flex flex-row gap-x-2 items-center">
					<p
						className={cn([
							"text-sm font-semibold px-2.5 text-white rounded-full",
							statusColor(data.status),
						])}
					>
						{data.status}
					</p>
					<p className="text-sm text-gray-400">{data.id}</p>
				</div>
				<p className="text-sm text-gray-400 text-right pl-2">
					{data.transaction_time
						? formatDate(new Date(data.transaction_time), true)
						: formatDate(new Date(data.createdAt), true)}
				</p>
			</div>
			<p className="text-xs font-bold pt-2 border-t">Detail Booking</p>
			<div className="flex flex-row">
				<div className="flex flex-col gap-y-1 text-gray-400 text-sm border-r pr-4 items-center justify-center">
					<p>{data.jam_mulai}</p>
					<p>-</p>
					<p>{data.jam_berakhir}</p>
				</div>
				<div className="flex flex-col gap-y-2 pl-4">
					<h1 className="text-lg font-bold">{data.jenis_lapangan}</h1>
					<p className="text-gray-400 text-sm">
						{formatDate(new Date(data.tanggal), true)}
					</p>
				</div>
			</div>
		</div>
	)
}

export default ItemBooking
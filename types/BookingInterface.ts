import { $Enums } from "@prisma/client"

export interface BookingRequestInterface {
	tanggal: string
	id_lapangan: string
	name?: string
}

export interface BookingResponseInterface {
	id: string
	name: string
	jenis_lapangan: string
	jam_mulai: string
	jam_berakhir: string
	harga: number
	id_lapangan: string
	createdAt: string
	updatedAt: string
	status: $Enums.TransactionStatus
	payment_type: string
	tanggal: string
}

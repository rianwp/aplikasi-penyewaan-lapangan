import { $Enums } from "@prisma/client"

export interface BookingRequestInterface {
	tanggal: string
	id_lapangan: string
	name?: string
}

export interface BatchBookingRequestInterface {
	tanggal: string
	id_lapangan: string[]
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
	transaction_time?: string
	status: string
	payment_type: string
	payment_link?: string
	tanggal: string
}

export interface BookingConfirmationInterface extends BookingRequestInterface {
	jenis_lapangan: string
	jam_mulai: string
	jam_berakhir: string
	harga: number
}

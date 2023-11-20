export interface SesiLapanganRequestInterface {
	jam_mulai: string
	jam_berakhir: string
}

export interface SesiLapanganResponseInterface {
	id: string
	jam_mulai: string
	jam_berakhir: string
	createdAt: Date
	updatedAt: Date
}

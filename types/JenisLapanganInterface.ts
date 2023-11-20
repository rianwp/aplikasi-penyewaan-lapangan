export interface JenisLapanganRequestInterface {
	jenis_lapangan: string
	deskripsi: string
	images: string[]
}

export interface JenisLapanganResponseInterface {
	id: string
	images: string[]
	jenis_lapangan: string
	deskripsi: string
	createdAt: Date
	updatedAt: Date
}

export interface LapanganRequestInterface {
	harga: number
	id_jenislap: string
	id_sesilap: string
}

export interface LapanganResponseInterface {
	id: string
	harga: number
	createdAt: Date
	updatedAt: Date
	available?: boolean
	JenisLapangan: {
		id: string
		jenis_lapangan: string
		deskripsi: string
		Image: {
			imageUrl: string
		}[]
	}
	SesiLapangan: {
		id: string
		jam_mulai: string
		jam_berakhir: string
	}
}

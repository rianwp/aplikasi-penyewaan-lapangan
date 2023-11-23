import { ImageLapanganResponseInterface } from "./ImageLapanganInterface"

export interface JenisLapanganRequestInterface {
	jenis_lapangan: string
	deskripsi: string
	images: string[]
}

export interface JenisLapanganResponseInterface {
	id: string
	Image: ImageLapanganResponseInterface[]
	jenis_lapangan: string
	deskripsi: string
	createdAt: Date
	updatedAt: Date
}

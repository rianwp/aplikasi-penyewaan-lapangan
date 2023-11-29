import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { JenisLapanganRequestInterface } from "@/types/JenisLapanganInterface"
import checkBody from "@/utils/checkBody"
import checkEmptyString from "@/utils/checkEmptyString"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
	const user = await auth(req, "admin")
	if (!user.success) {
		return NextResponse.json(
			{
				success: false,
				message: user.message,
			},
			{
				status: user.status,
			}
		)
	}
	const body = await req.json()
	checkBody(["jenis_lapangan", "deskripsi"], body)

	const { jenis_lapangan, deskripsi, images } =
		body as JenisLapanganRequestInterface

	if (checkEmptyString(jenis_lapangan) || checkEmptyString(deskripsi)) {
		return NextResponse.json(
			{
				success: false,
				message: "Jenis lapangan dan deskripsi tidak boleh kosong",
			},
			{
				status: 400,
			}
		)
	}

	const imageIdMap = images.map((image) => {
		return {
			id: image,
		}
	})

	try {
		await prisma.jenisLapangan.create({
			data: {
				jenis_lapangan,
				deskripsi,
				Image: {
					connect: imageIdMap,
				},
			},
		})

		return NextResponse.json(
			{
				success: true,
				message: "Jenis Lapangan sukses dibuat",
			},
			{
				status: 201,
			}
		)
	} catch (err) {
		const error = err as Error
		return NextResponse.json(
			{
				success: false,
				message: error.message ?? "Terjadi kesalahan pada server",
			},
			{
				status: 500,
			}
		)
	}
}

export const GET = async (req: NextRequest) => {
	try {
		const jenisLapangan = await prisma.jenisLapangan.findMany({
			include: {
				Image: true,
			},
		})

		return NextResponse.json(
			{
				success: true,
				data: {
					jenisLapangan,
				},
			},
			{
				status: 200,
			}
		)
	} catch (err) {
		const error = err as Error
		return NextResponse.json(
			{
				success: false,
				message: error.message ?? "Terjadi kesalahan pada server",
			},
			{
				status: 500,
			}
		)
	}
}

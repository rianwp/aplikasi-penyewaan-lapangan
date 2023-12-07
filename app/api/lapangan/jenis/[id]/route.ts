import { currentDateTZ } from "@/constants"
import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { IdParamsInterface } from "@/types/IdParamsInterface"
import { JenisLapanganRequestInterface } from "@/types/JenisLapanganInterface"
import checkEmptyString from "@/utils/checkEmptyString"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async (req: NextRequest, { params }: IdParamsInterface) => {
	const id = params.id
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

	const imageMap = images?.map((image) => {
		return {
			id: image,
		}
	})

	try {
		const findId = await prisma.jenisLapangan.findUnique({
			where: {
				id,
			},
		})

		if (!findId) {
			return NextResponse.json(
				{
					success: false,
					message: "Jenis Lapangan dengan id tersebut tidak ditemukan",
				},
				{
					status: 404,
				}
			)
		}

		await prisma.jenisLapangan.update({
			data: {
				jenis_lapangan,
				deskripsi,
				Image: {
					set: imageMap,
				},
				updatedAt: new Date(),
			},
			where: {
				id,
			},
		})

		return NextResponse.json(
			{
				success: true,
				message: "Jenis Lapangan sukses diupdate",
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

export const DELETE = async (
	req: NextRequest,
	{ params }: IdParamsInterface
) => {
	const id = params.id
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

	try {
		const findId = await prisma.jenisLapangan.findUnique({
			where: {
				id,
			},
		})

		if (!findId) {
			return NextResponse.json(
				{
					success: false,
					message: "Jenis Lapangan dengan id tersebut tidak ditemukan",
				},
				{
					status: 404,
				}
			)
		}

		await prisma.jenisLapangan.delete({
			where: {
				id,
			},
		})

		return NextResponse.json(
			{
				success: true,
				message: "Jenis Lapangan sukses dihapus",
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

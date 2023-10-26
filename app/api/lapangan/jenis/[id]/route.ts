import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { IdParamsInterface } from "@/types/params"
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
	const { jenis_lapangan, deskripsi, images } = body as {
		jenis_lapangan: string | undefined
		deskripsi: string | undefined
		images: string[] | undefined
	}

	const imageMap = images?.map((image) => {
		return {
			id: image,
		}
	})

	try {
		await prisma.jenisLapangan.update({
			data: {
				jenis_lapangan,
				deskripsi,
				Image: {
					connect: imageMap,
				},
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

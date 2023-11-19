import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { IdParamsInterface } from "@/types/IdParamsInterface"
import checkHourFormat from "@/utils/checkHourFormat"
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
	const { jam_mulai, jam_berakhir } = body as {
		jam_mulai: string | undefined
		jam_berakhir: string | undefined
	}

	const checkJamMulai = (jam_mulai && checkHourFormat(jam_mulai)) || !jam_mulai
	const checkJamBerakhir =
		(jam_berakhir && checkHourFormat(jam_berakhir)) || !jam_berakhir

	if (!checkJamMulai || !checkJamBerakhir) {
		return NextResponse.json(
			{
				success: false,
				message: "Format jam tidak valid",
			},
			{
				status: 400,
			}
		)
	}

	try {
		const findId = await prisma.sesiLapangan.findUnique({
			where: {
				id,
			},
		})

		if (!findId) {
			return NextResponse.json(
				{
					success: false,
					message: "Sesi dengan id tersebut tidak ditemukan",
				},
				{
					status: 404,
				}
			)
		}

		const sesi = await prisma.sesiLapangan.findFirst({
			where: {
				jam_mulai: jam_mulai,
				jam_berakhir: jam_berakhir,
			},
		})

		if (sesi) {
			return NextResponse.json(
				{
					success: false,
					message: "Sesi sudah ada sebelumnya",
				},
				{
					status: 400,
				}
			)
		}

		await prisma.sesiLapangan.update({
			data: {
				jam_mulai,
				jam_berakhir,
			},
			where: {
				id,
			},
		})

		return NextResponse.json(
			{
				success: true,
				message: "Sesi sukses diupdate",
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
		const findId = await prisma.sesiLapangan.findUnique({
			where: {
				id,
			},
		})

		if (!findId) {
			return NextResponse.json(
				{
					success: false,
					message: "Sesi dengan id tersebut tidak ditemukan",
				},
				{
					status: 404,
				}
			)
		}

		await prisma.sesiLapangan.delete({
			where: {
				id,
			},
		})

		return NextResponse.json(
			{
				success: true,
				message: "Sesi sukses dihapus",
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

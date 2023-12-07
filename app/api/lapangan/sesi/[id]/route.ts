import { currentDateTZ } from "@/constants"
import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { IdParamsInterface } from "@/types/IdParamsInterface"
import { SesiLapanganRequestInterface } from "@/types/SesiLapanganInterface"
import checkHourFormat from "@/utils/checkHourFormat"
import checkValidHours from "@/utils/checkValidHours"
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
	const { jam_mulai, jam_berakhir } = body as SesiLapanganRequestInterface

	if (!checkValidHours(jam_mulai, jam_berakhir) && jam_berakhir !== "00:00") {
		return NextResponse.json(
			{
				success: false,
				message: "Jam berakhir harus lebih besar dari jam mulai",
			},
			{
				status: 400,
			}
		)
	}

	if (!checkHourFormat(jam_mulai) || !checkHourFormat(jam_berakhir)) {
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
				updatedAt: new Date(),
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

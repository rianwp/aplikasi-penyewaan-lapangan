import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { SesiLapanganRequestInterface } from "@/types/SesiLapanganInterface"
import checkBody from "@/utils/checkBody"
import checkHourFormat from "@/utils/checkHourFormat"
import checkValidHours from "@/utils/checkValidHours"
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
	checkBody(["jam_mulai", "jam_berakhir"], body)

	const { jam_mulai, jam_berakhir } = body as SesiLapanganRequestInterface

	if (!checkValidHours(jam_mulai, jam_berakhir)) {
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

		await prisma.sesiLapangan.create({
			data: {
				jam_mulai: jam_mulai,
				jam_berakhir: jam_berakhir,
			},
		})

		return NextResponse.json(
			{
				success: true,
				message: "Sesi sukses dibuat",
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
		const sesi = await prisma.sesiLapangan.findMany()

		return NextResponse.json(
			{
				success: true,
				data: {
					sesi,
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

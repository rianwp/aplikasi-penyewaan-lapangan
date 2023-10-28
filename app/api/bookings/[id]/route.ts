import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { IdParamsInterface } from "@/types/params"
import checkDate from "@/utils/checkDate"
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
	const { tanggal, id_lapangan } = body as {
		tanggal: string | undefined
		id_lapangan: string | undefined
	}

	const isValidDate = (tanggal && checkDate(tanggal)) || !tanggal

	if (!isValidDate) {
		return NextResponse.json(
			{
				success: false,
				message: "Format tanggal tidak valid",
			},
			{
				status: 400,
			}
		)
	}

	try {
		const findId = await prisma.booking.findUnique({
			where: {
				id,
			},
		})

		if (!findId) {
			return NextResponse.json(
				{
					success: false,
					message: "Booking dengan id tersebut tidak ditemukan",
				},
				{
					status: 404,
				}
			)
		}

		const lapangan = await prisma.lapangan.findUnique({
			where: {
				id: id_lapangan,
			},
		})

		if (!lapangan) {
			return NextResponse.json(
				{
					success: false,
					message: "Lapangan dengan id tersebut tidak ditemukan",
				},
				{
					status: 404,
				}
			)
		}

		const tanggalNotAvailable = await prisma.booking.findFirst({
			where: {
				tanggal: new Date(tanggal || ""),
				id_lapangan,
			},
		})

		if (tanggalNotAvailable) {
			return NextResponse.json(
				{
					success: false,
					message: "Tanggal ini sudah di booking",
				},
				{
					status: 400,
				}
			)
		}

		await prisma.booking.update({
			data: {
				tanggal,
				id_lapangan,
			},
			where: {
				id,
			},
		})

		return NextResponse.json(
			{
				success: true,
				message: "Booking sukses diupdate",
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
		const findId = await prisma.booking.findUnique({
			where: {
				id,
			},
		})

		if (!findId) {
			return NextResponse.json(
				{
					success: false,
					message: "Booking dengan id tersebut tidak ditemukan",
				},
				{
					status: 404,
				}
			)
		}

		await prisma.booking.delete({
			where: {
				id,
			},
		})

		return NextResponse.json(
			{
				success: true,
				message: "Booking sukses dihapus",
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

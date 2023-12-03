import { FAILED_TRANSACTION } from "@/constants"
import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { BookingRequestInterface } from "@/types/BookingInterface"
import { IdParamsInterface } from "@/types/IdParamsInterface"
import checkDate from "@/utils/checkDate"
import formatDate from "@/utils/formatDate"
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
	const { tanggal, id_lapangan, name } = body as BookingRequestInterface

	if (!checkDate(tanggal)) {
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
			select: {
				harga: true,
				SesiLapangan: {
					select: {
						jam_berakhir: true,
					},
				},
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

		if (
			new Date(
				`${formatDate(new Date(tanggal))} ${lapangan.SesiLapangan.jam_berakhir}`
			) < new Date()
		) {
			return NextResponse.json(
				{
					success: false,
					message:
						"Sesi yang di booking sudah terlewat, silahkan booking sesi selanjutnya",
				},
				{
					status: 400,
				}
			)
		}

		const tanggalNotAvailable = await prisma.booking.findFirst({
			where: {
				tanggal: new Date(formatDate(new Date(tanggal))),
				id_lapangan,
				status: {
					notIn: FAILED_TRANSACTION,
				},
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
				atas_nama: !name || name === "" ? user.data?.name : name,
				tanggal: new Date(formatDate(new Date(tanggal))),
				id_lapangan: {
					set: id_lapangan,
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

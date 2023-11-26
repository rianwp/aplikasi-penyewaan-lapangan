import { SUCCESS_TRANSACTION } from "@/constants"
import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { IdParamsInterface } from "@/types/IdParamsInterface"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, { params }: IdParamsInterface) => {
	const id = params.id
	const user = await auth(req, "user")
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
		const booking = await prisma.booking.findUnique({
			include: {
				Lapangan: {
					select: {
						id: true,
						harga: true,
						JenisLapangan: {
							select: {
								jenis_lapangan: true,
							},
						},
						SesiLapangan: {
							select: {
								jam_mulai: true,
								jam_berakhir: true,
							},
						},
					},
				},
			},
			where: {
				id,
				id_user: user.data?.id,
			},
		})

		if (!booking) {
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

		return NextResponse.json(
			{
				success: true,
				data: {
					booking: {
						id: booking.id,
						name: booking.atas_nama,
						jenis_lapangan: booking.Lapangan.JenisLapangan.jenis_lapangan,
						jam_mulai: booking.Lapangan.SesiLapangan.jam_mulai,
						jam_berakhir: booking.Lapangan.SesiLapangan.jam_berakhir,
						id_lapangan: booking.Lapangan.id,
						harga: booking.Lapangan.harga,
						createdAt: booking.createdAt,
						updatedAt: booking.updatedAt,
						status: SUCCESS_TRANSACTION.includes(booking.status)
							? "success"
							: booking.status,
						payment_type: booking.payment_type,
						tanggal: booking.tanggal,
					},
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

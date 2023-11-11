import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { IdParamsInterface } from "@/types/params"
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
				User: {
					select: {
						name: true,
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
						name: booking.User.name,
						jenis_lapangan: booking.Lapangan.JenisLapangan.jenis_lapangan,
						jam_mulai: booking.Lapangan.SesiLapangan.jam_mulai,
						jam_berakhir: booking.Lapangan.SesiLapangan.jam_berakhir,
						harga: booking.Lapangan.harga,
						createdAt: booking.createdAt,
						updatedAt: booking.updatedAt,
						status: booking.status,
						payment_type: booking.payment_type,
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

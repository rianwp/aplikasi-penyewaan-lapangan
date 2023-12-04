import { SUCCESS_TRANSACTION } from "@/constants"
import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
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
		const booking = await prisma.booking.findMany({
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
				id_user: user.data?.id,
			},
		})

		const returnedData = booking.map((data) => {
			return {
				id: data.id,
				name: data.atas_nama,
				jenis_lapangan: data.Lapangan.JenisLapangan.jenis_lapangan,
				jam_mulai: data.Lapangan.SesiLapangan.jam_mulai,
				jam_berakhir: data.Lapangan.SesiLapangan.jam_berakhir,
				id_lapangan: data.Lapangan.id,
				harga: data.Lapangan.harga,
				createdAt: data.createdAt,
				updatedAt: data.updatedAt,
				transaction_time: data.transaction_time,
				status: SUCCESS_TRANSACTION.includes(data.status)
					? "success"
					: data.status,
				payment_type: data.payment_type,
				payment_link: data.payment_link,
				tanggal: data.tanggal,
			}
		})

		return NextResponse.json(
			{
				success: true,
				data: {
					booking: returnedData,
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

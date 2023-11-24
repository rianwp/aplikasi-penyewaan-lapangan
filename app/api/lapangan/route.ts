import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { LapanganRequestInterface } from "@/types/LapanganInterface"
import checkBody from "@/utils/checkBody"
import checkDate from "@/utils/checkDate"
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
	checkBody(["harga", "id_jenislap", "id_sesilap"], body)

	const { harga, id_jenislap, id_sesilap } = body as LapanganRequestInterface

	try {
		const sesi = await prisma.sesiLapangan.findUnique({
			where: {
				id: id_sesilap,
			},
		})

		if (!sesi) {
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

		const jenisLapangan = await prisma.jenisLapangan.findUnique({
			where: {
				id: id_jenislap,
			},
		})

		if (!jenisLapangan) {
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

		await prisma.lapangan.create({
			data: {
				harga,
				id_jenislap,
				id_sesilap,
			},
		})

		return NextResponse.json(
			{
				success: true,
				message: "Lapangan sukses dibuat",
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
	const tanggal = req.nextUrl.searchParams.get("tanggal")

	const isDateValid = (tanggal && checkDate(tanggal)) || !tanggal

	if (!isDateValid) {
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
		const lapangan = await prisma.lapangan.findMany({
			select: {
				id: true,
				harga: true,
				createdAt: true,
				updatedAt: true,
				JenisLapangan: {
					select: {
						id: true,
						jenis_lapangan: true,
						deskripsi: true,
						Image: {
							select: {
								imageUrl: true,
							},
						},
					},
				},
				SesiLapangan: {
					select: {
						id: true,
						jam_mulai: true,
						jam_berakhir: true,
					},
				},
				Booking: {
					select: {
						tanggal: true,
					},
				},
			},
		})

		// const lapanganNotAvailable = tanggal
		// 	? await prisma.lapangan.findMany({
		// 			select: {
		// 				id: true,
		// 			},
		// 			where: {
		// 				Booking: {
		// 					every: {
		// 						tanggal: isDateValid ? new Date(tanggal) : undefined,
		// 					},
		// 				},
		// 			},
		// 	  })
		// 	: []

		const filteredLapangan = lapangan.map((lap) => {
			const { Booking, ...lapWithoutBooking } = lap
			if (!tanggal) {
				return lapWithoutBooking
			}
			if (lap.Booking.includes({ tanggal: new Date(tanggal) })) {
				return {
					...lapWithoutBooking,
					available: false,
				}
			} else {
				return {
					...lapWithoutBooking,
					available: true,
				}
			}
		})

		return NextResponse.json(
			{
				success: true,
				data: {
					lapangan: filteredLapangan,
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

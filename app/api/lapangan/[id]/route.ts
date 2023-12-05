import { FAILED_TRANSACTION } from "@/constants"
import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { IdParamsInterface } from "@/types/IdParamsInterface"
import { LapanganRequestInterface } from "@/types/LapanganInterface"
import checkDate from "@/utils/checkDate"
import formatDate from "@/utils/formatDate"
import { utcToZonedTime } from "date-fns-tz"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, { params }: IdParamsInterface) => {
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
	const id = params.id
	try {
		const lapangan = await prisma.lapangan.findUnique({
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
						status: true,
					},
				},
			},
			where: {
				id,
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
		} else {
			const filterBooking = () => {
				const { Booking, ...lapWithoutBooking } = lapangan
				const isLapanganNotAvailable = lapangan.Booking.some((data) => {
					return (
						!FAILED_TRANSACTION.includes(data.status) &&
						formatDate(data.tanggal) ===
							formatDate(new Date(tanggal || new Date()))
						// 	&&
						// new Date(
						// 	`${formatDate(new Date(tanggal || new Date()))} ${
						// 		lapangan.SesiLapangan.jam_berakhir
						// 	}`
						// ) < utcToZonedTime(new Date(), "Asia/Jakarta")
					)
				})
				return {
					...lapWithoutBooking,
					available: !isLapanganNotAvailable,
				}
			}

			return NextResponse.json(
				{
					success: true,
					data: {
						lapangan: filterBooking(),
					},
				},
				{
					status: 200,
				}
			)
		}
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
	const { harga, id_jenislap, id_sesilap } = body as LapanganRequestInterface

	try {
		const findId = await prisma.lapangan.findUnique({
			where: {
				id,
			},
		})

		if (!findId) {
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

		await prisma.lapangan.update({
			data: {
				harga,
				id_jenislap: {
					set: id_jenislap,
				},
				id_sesilap: {
					set: id_sesilap,
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
				message: "Lapangan sukses diupdate",
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
		const findId = await prisma.lapangan.findUnique({
			where: {
				id,
			},
		})

		if (!findId) {
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

		await prisma.lapangan.delete({
			where: {
				id,
			},
		})

		return NextResponse.json(
			{
				success: true,
				message: "Lapangan sukses dihapus",
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

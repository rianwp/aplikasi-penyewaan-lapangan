import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
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

	const { harga, id_jenislap, id_sesilap } = body as {
		harga: number
		id_jenislap: string
		id_sesilap: string
	}

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
	const tanggalParams = req.nextUrl.searchParams.get("tanggal")
	const tanggal = new Date(tanggalParams || "")

	if (!checkDate(tanggalParams) && tanggalParams) {
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
			include: {
				JenisLapangan: true,
				SesiLapangan: true,
			},
		})

		const lapanganNotAvailable = tanggalParams
			? await prisma.lapangan.findMany({
					include: {
						JenisLapangan: true,
						SesiLapangan: true,
					},
					where: {
						Booking: {
							every: {
								tanggal: tanggalParams ? tanggal : undefined,
							},
						},
					},
			  })
			: []

		const filteredLapangan = lapangan.map((lap) => {
			if (!tanggalParams) {
				return lap
			}
			if (lapanganNotAvailable.includes(lap)) {
				return {
					...lap,
					available: false,
				}
			} else {
				return {
					...lap,
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

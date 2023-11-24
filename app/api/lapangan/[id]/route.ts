import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { IdParamsInterface } from "@/types/IdParamsInterface"
import { LapanganRequestInterface } from "@/types/LapanganInterface"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, { params }: IdParamsInterface) => {
	const id = params.id
	try {
		const lapangan = await prisma.lapangan.findUnique({
			select: {
				id: true,
				harga: true,
				createdAt: true,
				updatedAt: true,
				JenisLapangan: true,
				SesiLapangan: true,
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
		}

		return NextResponse.json(
			{
				success: true,
				data: {
					lapangan,
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

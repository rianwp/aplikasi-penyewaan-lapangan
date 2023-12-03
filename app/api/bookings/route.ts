import {
	FAILED_TRANSACTION,
	SUCCESS_TRANSACTION,
} from "@/constants"
import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { BookingRequestInterface } from "@/types/BookingInterface"
import checkBody from "@/utils/checkBody"
import checkDate from "@/utils/checkDate"
import formatDate from "@/utils/formatDate"
import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export const POST = async (req: NextRequest) => {
	const user = await auth(req)
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
	checkBody(["tanggal", "id_lapangan"], body)

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

		const orderId = uuidv4()

		const dataTransaction = {
			transaction_details: {
				order_id: orderId,
				gross_amount: lapangan.harga,
			},
			customer_details: {
				first_name:
					user.data?.role === "admin"
						? !name || name === ""
							? user.data.name
							: name
						: user.data?.name || "",
				email: user.data?.email,
			},
		}

		const bookingPayload: Prisma.BookingUncheckedCreateInput = {
			id: orderId,
			tanggal: new Date(formatDate(new Date(tanggal))),
			id_lapangan,
			id_user: user.data?.id || "",
			atas_nama:
				user.data?.role === "admin"
					? !name || name === ""
						? user.data.name
						: name
					: user.data?.name || "",
			amount: lapangan.harga,
			gross_amount: lapangan.harga,
			payment_type: user.data?.role === "admin" ? "offline" : "midtrans",
			status: user.data?.role === "admin" ? "offline_payment" : undefined,
			createdAt: new Date(),
			updatedAt: new Date(),
		}

		if (user.data?.role === "user") {
			const transaction = await fetch(process.env.MIDTRANS_SERVER_URL || "", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Basic ${process.env.MIDTRANS_SERVER_KEY_HASHED}`,
				},
				body: JSON.stringify(dataTransaction),
			})

			const { redirect_url } = (await transaction.json()) as {
				token: string
				redirect_url: string
			}

			await prisma.booking.create({
				data: {
					...bookingPayload,
				},
			})

			return NextResponse.json(
				{
					success: true,
					data: {
						redirectUrl: redirect_url,
					},
				},
				{
					status: 201
				}
			)
		}

		await prisma.booking.create({
			data: bookingPayload,
		})

		return NextResponse.json(
			{
				success: true,
				message: "Booking sukses dibuat",
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

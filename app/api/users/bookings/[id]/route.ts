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
					booking,
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

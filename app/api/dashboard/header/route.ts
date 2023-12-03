import { SUCCESS_TRANSACTION } from "@/constants"
import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

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
		const transaction = await prisma.booking.aggregate({
			_count: {
				_all: true,
			},
			_sum: {
				gross_amount: true,
			},
			where: {
				status: {
					in: SUCCESS_TRANSACTION,
				},
			},
		})

		const totalBooking = await prisma.booking.count()
		const totalUser = await prisma.user.count({
			where: {
				role: "user",
			},
		})

		return NextResponse.json(
			{
				success: true,
				data: {
					successTransaction: transaction._count._all,
					amountTransaction: transaction._sum.gross_amount
						? transaction._sum.gross_amount
						: 0,
					totalBooking,
					totalUser,
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

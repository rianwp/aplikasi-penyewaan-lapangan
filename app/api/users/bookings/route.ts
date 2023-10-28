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
			where: {
				id_user: user.data?.id,
			},
		})

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

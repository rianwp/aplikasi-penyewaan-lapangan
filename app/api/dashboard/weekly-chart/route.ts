import { SUCCESS_TRANSACTION, currentDateTZ } from "@/constants"
import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import formatDate from "@/utils/formatDate"
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
		const firstDayOfThisWeek = () => {
			const currentDate = new Date()
			currentDate.setDate(currentDate.getDate() - currentDate.getDay())
			return new Date(formatDate(currentDate))
		}
		const lastDayOfThisWeek = () => {
			const firstDay = firstDayOfThisWeek()
			firstDay.setDate(firstDay.getDate() + 6)
			return new Date(formatDate(firstDay))
		}
		const booking = await prisma.booking.findMany({
			where: {
				status: {
					in: SUCCESS_TRANSACTION,
				},
				createdAt: {
					gte: firstDayOfThisWeek(),
					lte: lastDayOfThisWeek(),
				},
			},
			select: {
				transaction_time: true,
				createdAt: true,
			},
		})

		const weeklyTransaction = () => {
			const weeklyData = [0, 0, 0, 0, 0, 0, 0]
			booking.map((data) => {
				const dayIndex = new Date(
					data.transaction_time || data.createdAt
				).getDay()
				weeklyData[dayIndex] += 1
			})
			return {
				sun: weeklyData[0],
				mon: weeklyData[1],
				tue: weeklyData[2],
				wed: weeklyData[3],
				thu: weeklyData[4],
				fri: weeklyData[5],
				sat: weeklyData[6],
			}
		}

		return NextResponse.json(
			{
				success: true,
				data: {
					weeklyTransaction: weeklyTransaction(),
					startAt: firstDayOfThisWeek(),
					endAt: lastDayOfThisWeek(),
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

import auth from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async (req: NextRequest) => {
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
	return NextResponse.json(
		{
			success: true,
			message: "ini bookings",
		},
		{
			status: 200,
		}
	)
}

export const DELETE = async (req: NextRequest) => {
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
	return NextResponse.json(
		{
			success: true,
			message: "ini bookings",
		},
		{
			status: 200,
		}
	)
}

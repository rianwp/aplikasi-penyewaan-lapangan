import auth from "@/lib/auth"
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

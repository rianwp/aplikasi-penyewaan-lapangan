import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
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

export const GET = async (req: NextRequest) => {
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

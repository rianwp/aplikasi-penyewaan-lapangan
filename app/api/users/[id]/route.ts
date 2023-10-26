import { NextRequest, NextResponse } from "next/server"

export const PUT = async (req: NextRequest) => {
	return NextResponse.json(
		{
			success: true,
			message: "ini users",
		},
		{
			status: 200,
		}
	)
}

export const DELETE = async (req: NextRequest) => {
	return NextResponse.json(
		{
			success: true,
			message: "ini users",
		},
		{
			status: 200,
		}
	)
}

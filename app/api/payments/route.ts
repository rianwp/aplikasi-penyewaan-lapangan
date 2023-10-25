import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
	return NextResponse.json(
		{
			success: true,
			message: "ini payments",
		},
		{
			status: 200,
		}
	)
}

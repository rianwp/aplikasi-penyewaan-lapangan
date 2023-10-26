import { NextRequest, NextResponse } from "next/server"

export const PUT = async (req: NextRequest) => {
	return NextResponse.json(
		{
			success: true,
			message: "ini admins",
		},
		{
			status: 200,
		}
	)
}

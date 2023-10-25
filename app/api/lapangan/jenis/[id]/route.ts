import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
	return NextResponse.json(
		{
			success: true,
			message: "ini jenis",
		},
		{
			status: 200,
		}
	)
}

export const PUT = async (req: NextRequest) => {
	return NextResponse.json(
		{
			success: true,
			message: "ini jenis",
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
			message: "ini jenis",
		},
		{
			status: 200,
		}
	)
}

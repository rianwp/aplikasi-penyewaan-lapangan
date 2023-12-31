import { COOKIE_AUTH } from "@/constants"
import { serialize } from "cookie"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
	if (!req.cookies.get(COOKIE_AUTH)) {
		return NextResponse.json(
			{
				success: false,
				message: "Tidak terdeteksi login",
			},
			{
				status: 400,
			}
		)
	}

	const token = req.cookies.get(COOKIE_AUTH)?.value || ""
	const serialized = serialize(COOKIE_AUTH, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: -1,
		path: "/",
	})

	return NextResponse.json(
		{
			success: true,
			message: "Sukses logout",
		},
		{
			status: 200,
			headers: {
				"Set-Cookie": serialized,
			},
		}
	)
}

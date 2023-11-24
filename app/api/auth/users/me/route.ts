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

	const payload = {
		id: user.data?.id,
		email: user.data?.email,
		role: user.data?.role,
		name: user.data?.name,
		no_telp: user.data?.no_telp,
	}

	return NextResponse.json(
		{
			success: true,
			data: {
				user: payload,
			},
		},
		{
			status: 200,
		}
	)
}

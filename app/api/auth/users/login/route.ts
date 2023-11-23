import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { COOKIE_NAME, MAX_AGE, USER_AGENT_ANDROID } from "@/constants"
import { serialize } from "cookie"

export const POST = async (req: NextRequest) => {
	const { email, password } = await req.json()
	const userAgent = req.headers.get("User-Agent")
	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (!user) {
			return NextResponse.json(
				{
					success: false,
					message: "User dengan email tersebut tidak ditemukan",
				},
				{
					status: 401,
				}
			)
		}

		const isPasswordValid = await compare(password, user.password || "")
		if (!isPasswordValid) {
			return NextResponse.json(
				{
					success: false,
					message: "Password salah",
				},
				{
					status: 401,
				}
			)
		}

		if (user.role !== "user") {
			return NextResponse.json(
				{
					success: false,
					message: "Gunakan akun user untuk login",
				},
				{
					status: 401,
				}
			)
		}

		const payload = {
			id: user.id,
			email: user.email,
			role: user.role,
			name: user.name,
			no_telp: user.no_telp,
		}
		const secret = process.env.JWT_SECRET || ""
		const token = sign(payload, secret, {
			expiresIn: MAX_AGE,
		})

		if (userAgent === USER_AGENT_ANDROID) {
			return NextResponse.json(
				{
					success: true,
					message: "Sukses login",
					data: {
						token,
					},
				},
				{
					status: 200,
				}
			)
		} else {
			const serialized = serialize(COOKIE_NAME, token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: MAX_AGE,
				path: "/",
			})
			return NextResponse.json(
				{
					success: true,
					message: "Sukses login",
				},
				{
					status: 200,
					headers: {
						"Set-Cookie": serialized,
					},
				}
			)
		}
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

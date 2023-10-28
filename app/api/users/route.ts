import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import checkEmail from "@/utils/checkEmail"
import checkPhoneNumber from "@/utils/checkPhoneNumber"
import { hash } from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async (req: NextRequest) => {
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
	const body = await req.json()
	const { name, email, password, no_telp } = body as {
		name: string | undefined
		email: string | undefined
		password: string | undefined
		no_telp: string | undefined
	}
	try {
		const userEmail = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (userEmail) {
			return NextResponse.json(
				{
					success: false,
					message: "Email sudah digunakan",
				},
				{
					status: 400,
				}
			)
		}

		const isValidEmail = (email && checkEmail(email)) || !email
		const isValidPassword =
			(password && password.length < 8) || !password
		const isValidNoTelp = (no_telp && !checkPhoneNumber(no_telp)) || !no_telp

		if (!isValidEmail) {
			return NextResponse.json(
				{
					success: false,
					message: "Email tidak valid",
				},
				{
					status: 400,
				}
			)
		}

		if (!isValidPassword) {
			return NextResponse.json(
				{
					success: false,
					message: "Password minimal 8 karakter",
				},
				{
					status: 400,
				}
			)
		}

		if (!isValidNoTelp) {
			return NextResponse.json(
				{
					success: false,
					message: "Nomer telepon tidak valid",
				},
				{
					status: 400,
				}
			)
		}

		const saltRounds = 10
		const hashedPassword = await hash(password || "", saltRounds)

		await prisma.user.update({
			data: {
				email,
				name,
				password: password ? hashedPassword : undefined,
				no_telp,
			},
			where: {
				id: user.data?.id,
			},
		})

		return NextResponse.json(
			{
				success: true,
				message: "User sukses diupdate",
			},
			{
				status: 200,
			}
		)
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

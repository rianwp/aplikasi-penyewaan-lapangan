import { prisma } from "@/lib/db"
import checkBody from "@/utils/checkBody"
import checkEmail from "@/utils/checkEmail"
import checkPhoneNumber from "@/utils/checkPhoneNumber"
import { hash } from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
	const body = await req.json()
	checkBody(["name", "email", "password", "no_telp", "confirm_password"], body)

	const { name, email, password, no_telp, confirm_password } = body as {
		name: string
		email: string
		password: string
		no_telp: string
		confirm_password: string
	}
	try {
		const user = await prisma.user.findFirst({
			where: {
				email,
			},
		})

		if (!checkEmail(email)) {
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

		if (user) {
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

		if (password.length < 8) {
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

		if (password !== confirm_password) {
			return NextResponse.json(
				{
					success: false,
					message: "Confirm Password harus sama dengan Password",
				},
				{
					status: 400,
				}
			)
		}

		if (!checkPhoneNumber(no_telp)) {
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
		const hashedPassword = await hash(password, saltRounds)

		await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
				no_telp,
			},
		})

		return NextResponse.json(
			{
				success: true,
				message: "Register sukses",
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

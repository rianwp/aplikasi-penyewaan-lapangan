import { COOKIE_AUTH, MAX_AGE, currentDateTZ } from "@/constants"
import { prisma } from "@/lib/db"
import { RegisterInterface } from "@/types/RegisterInterface"
import checkBody from "@/utils/checkBody"
import checkEmail from "@/utils/checkEmail"
import checkEmptyString from "@/utils/checkEmptyString"
import checkPhoneNumber from "@/utils/checkPhoneNumber"
import { hash } from "bcrypt"
import { serialize } from "cookie"
import { sign } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
	const body = await req.json()
	checkBody(["name", "email", "password", "no_telp", "confirm_password"], body)

	const { name, email, password, no_telp, confirm_password } =
		body as RegisterInterface

	if (checkEmptyString(name)) {
		return NextResponse.json(
			{
				success: false,
				message: "Nama tidak boleh kosong",
			},
			{
				status: 400,
			}
		)
	}

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

	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		})

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

		const saltRounds = 10
		const hashedPassword = await hash(password, saltRounds)

		const newUser = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
				no_telp,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		})

		const payload = {
			id: newUser.id,
			email: newUser.email,
			role: newUser.role,
			name: newUser.name,
			no_telp: newUser.no_telp,
		}

		const secret = process.env.JWT_SECRET || ""
		const token = sign(payload, secret, {
			expiresIn: MAX_AGE,
		})

		const serialized = serialize(COOKIE_AUTH, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: MAX_AGE,
			path: "/",
		})

		return NextResponse.json(
			{
				success: true,
				message: "Register sukses",
			},
			{
				status: 201,
				headers: {
					"Set-Cookie": serialized,
				},
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

import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import { UserEditRequestInterface } from "@/types/UserInterface"
import checkEmail from "@/utils/checkEmail"
import checkEmptyString from "@/utils/checkEmptyString"
import checkPhoneNumber from "@/utils/checkPhoneNumber"
import { compare, hash } from "bcrypt"
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
	const { name, email, password, no_telp, new_password } =
		body as UserEditRequestInterface
	try {
		const userEmail = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (userEmail && userEmail.email !== user.data?.email) {
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

		if (new_password && new_password.length < 8) {
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

		const saltRounds = 10
		const hashedNewPassword = await hash(new_password || "", saltRounds)
		const isPasswordValid = await compare(
			password || "",
			user.data?.password || ""
		)
		const isUpdatePassword = new_password && password && isPasswordValid

		if (new_password && password && !isPasswordValid) {
			return NextResponse.json(
				{
					success: false,
					message: "Password Salah",
				},
				{
					status: 400,
				}
			)
		}

		await prisma.user.update({
			data: {
				email,
				name,
				password: isUpdatePassword ? hashedNewPassword : undefined,
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

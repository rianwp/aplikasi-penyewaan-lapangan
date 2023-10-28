import { NextRequest } from "next/server"
import { prisma } from "./db"
import { verify } from "jsonwebtoken"
import { Role, User } from "@prisma/client"
import { COOKIE_NAME } from "@/constants"

const auth = async (req: NextRequest, role?: Role) => {
	const secret = process.env.JWT_SECRET || ""
	const bearerToken = req.headers.get("Authorization")?.split("Bearer ")[1]

	if (!bearerToken && !req.cookies.get(COOKIE_NAME)) {
		return {
			success: false,
			message: "Unauthorized",
			status: 401,
		}
	}

	try {
		const payload = verify(
			bearerToken || req.cookies.get(COOKIE_NAME)?.value || "",
			secret
		) as User
		const user = await prisma.user.findUnique({
			where: {
				id: payload.id,
				role: role ?? {
					in: ["admin", "user"],
				},
			},
		})

		if (!user) {
			return {
				success: false,
				message: "Unauthorized",
				status: 401,
			}
		}

		return {
			success: true,
			data: user,
			status: 200,
		}
	} catch (err) {
		const error = err as Error
		return {
			success: false,
			message: error.message ?? "Terjadi kesalahan pada server",
			status: 500,
		}
	}
}

export default auth

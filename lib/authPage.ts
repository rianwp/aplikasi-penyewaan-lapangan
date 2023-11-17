import { prisma } from "./db"
import { verify } from "jsonwebtoken"
import { Role, User } from "@prisma/client"
import { COOKIE_NAME } from "@/constants"
import { cookies } from "next/headers"

const authPage = async (role?: Role) => {
	const secret = process.env.JWT_SECRET || ""
	try {
		const payload = verify(
			cookies().get(COOKIE_NAME)?.value || "",
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
			return false
		}
		return true
	} catch (err) {
		return false
	}
}

export default authPage
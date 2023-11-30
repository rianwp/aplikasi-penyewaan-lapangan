import { cookies } from "next/headers"
import { COOKIE_PAYMENT_STATUS } from "@/constants"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
	cookies().delete(COOKIE_PAYMENT_STATUS)
	redirect("/payment/status")
}
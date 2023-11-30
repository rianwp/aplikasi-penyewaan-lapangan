import { COOKIE_PAYMENT_STATUS } from "@/constants"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
	cookies().set(COOKIE_PAYMENT_STATUS, "failed")
	redirect("/payment/status")
}
import { $Enums } from "@prisma/client"

export const COOKIE_AUTH = "token"
export const COOKIE_PAYMENT_STATUS = "payment_status"
export const MAX_AGE = 60 * 60 * 24
export const USER_AGENT_ANDROID = "margajaya-app"
export const SUCCESS_TRANSACTION: $Enums.TransactionStatus[] = [
	"settlement",
	"capture",
	"offline_payment",
]

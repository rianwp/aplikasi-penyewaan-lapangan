import { $Enums } from "@prisma/client"

export const COOKIE_NAME = "token"
export const MAX_AGE = 60 * 60 * 24
export const USER_AGENT_ANDROID = "margajaya-app"
export const SUCCESS_TRANSACTION: $Enums.TransactionStatus[] = [
	"settlement",
	"capture",
	"offline_payment",
]

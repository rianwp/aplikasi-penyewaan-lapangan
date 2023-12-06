import validateAndConvertTZ from "@/utils/validateAndConvertTZ"
import { $Enums } from "@prisma/client"

export const COOKIE_AUTH = "token"
export const MAX_AGE = 60 * 60 * 24
export const USER_AGENT_ANDROID = "margajaya-app"
export const SUCCESS_TRANSACTION: $Enums.TransactionStatus[] = [
	"settlement",
	"capture",
	"offline_payment",
]
export const FAILED_TRANSACTION: $Enums.TransactionStatus[] = [
	"cancel",
	"expire",
	"failure",
	"deny",
]
export const currentDateTZ = new Date()

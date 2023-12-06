import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz"

const validateAndConvertTZ = (date: Date) => {
	return utcToZonedTime(date, "Asia/Jakarta")
}

export default validateAndConvertTZ

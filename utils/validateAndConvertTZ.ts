import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz"

const validateAndConvertTZ = (date: Date) => {
	if (date.getTimezoneOffset() === 0) {
		return utcToZonedTime(date, "Asia/Jakarta")
	} else {
		return date
	}
}

export default validateAndConvertTZ

import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz"

const validateAndConvertTZ = (date: Date) => {
	if (date.getTimezoneOffset() === 0) {
		return utcToZonedTime(date, "Asia/Jakarta")
	} else {
		const utcDate = zonedTimeToUtc(date, "Etc/UTC")
		return utcToZonedTime(utcDate, "Asia/Jakarta")
	}
}

export default validateAndConvertTZ

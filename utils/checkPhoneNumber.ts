const checkPhoneNumber = (phoneNumber: string) => {
	const checkStartsWith =
		phoneNumber.startsWith("08") || phoneNumber.startsWith("62")
	const checkDigit = phoneNumber.length >= 10 && phoneNumber.length <= 15
	if (checkDigit && checkStartsWith) {
		return true
	}
	return false
}

export default checkPhoneNumber

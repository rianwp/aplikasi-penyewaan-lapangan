const checkPhoneNumber = (phoneNumber: string) => {
	const cleanNumber = phoneNumber.replace(/\D/g, "")
	const checkStartsWith = cleanNumber.startsWith("08") || cleanNumber.startsWith("62")
	const checkDigit = cleanNumber.length >= 10 && phoneNumber.length <= 15
	if (checkDigit && checkStartsWith) {
		return true
	}
	return false
}

export default checkPhoneNumber

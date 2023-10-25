const checkPhoneNumber = (phoneNumber: string) => {
	const cleanNumber = phoneNumber.replace(/\D/g, "")
	const checkDigit = cleanNumber.length >= 10 && phoneNumber.length <= 15
	if (checkDigit) {
		return true
	}
	return false
}

export default checkPhoneNumber

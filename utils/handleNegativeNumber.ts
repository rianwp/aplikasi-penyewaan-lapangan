const handleNegativeNumber = (number: string) => {
	let clearedNumber = Number(number).toString()
	if (Number(clearedNumber) < 0) {
		return "0"
	}
	return clearedNumber
}

export default handleNegativeNumber

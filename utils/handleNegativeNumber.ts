const handleNegativeNumber = (number: number | string) => {
	if (Number(number) < 0) {
		return 0
	}
	return Number(number)
}

export default handleNegativeNumber

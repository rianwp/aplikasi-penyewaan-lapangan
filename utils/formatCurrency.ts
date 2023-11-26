const formatCurrency = (number: number) => {
	const result = []
	const string = number.toString()
	const reversedString = string.split("").reverse()

	for (let i = 0; i < reversedString.length; i++) {
		if (i % 3 === 0 && i != 0) {
			result.push(`${reversedString[i]}.`)
		} else {
			result.push(reversedString[i])
		}
	}
	return result.reverse().join("")
}

export default formatCurrency

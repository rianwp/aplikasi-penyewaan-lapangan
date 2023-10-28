const checkDate = (date: any) => {
	return !isNaN(new Date(date).getTime())
}

export default checkDate

const formatDate = (date: Date, local?: boolean) => {
	if (local) {
		return date.toLocaleDateString("id-ID", { dateStyle: "medium" })
	}
	return date.toDateString()
}

export default formatDate

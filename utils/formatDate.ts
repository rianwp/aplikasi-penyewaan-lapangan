const formatDate = (date: Date) => {
	return date.toLocaleDateString("id-ID", { dateStyle: "medium" })
}

export default formatDate

import validateAndConvertTZ from "./validateAndConvertTZ"

const formatDate = (date: Date, local?: boolean) => {
	const checkedDate = validateAndConvertTZ(date)
	if (local) {
		return checkedDate.toLocaleDateString("id-ID", { dateStyle: "medium" })
	}
	return checkedDate.toDateString()
}

export default formatDate

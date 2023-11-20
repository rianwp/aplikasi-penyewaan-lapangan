const checkValidHours = (jam_mulai: string, jam_berakhir: string) => {
	if (
		new Date(`2000-01-01 ${jam_mulai}`) < new Date(`2000-01-01 ${jam_berakhir}`)
	) {
		return true
	}
	return false
}
export default checkValidHours

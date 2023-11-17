const initialName = (fullName: string) =>
	fullName
		.split(" ")
		.map((n) => n[0])
		.join("")

export default initialName

import { NextResponse } from "next/server"

const checkBody = (requiredProps: string[], body: any) => {
	const undefinedProps = []
	for (const prop of requiredProps) {
		if (body[prop]) {
			undefinedProps.push(prop)
		}
	}

	if (undefinedProps.length > 0) {
		return NextResponse.json(
			{
				success: false,
				message: `${undefinedProps.toString()} harus ada`,
			},
			{
				status: 400,
			}
		)
	}
}

export default checkBody

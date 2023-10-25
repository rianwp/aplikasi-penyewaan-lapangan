import { NextRequest, NextResponse } from "next/server"

export const middleware = async (req: NextRequest) => {
	return NextResponse.next()
}

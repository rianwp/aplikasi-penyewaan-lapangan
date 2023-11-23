import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import imageKit from "@/lib/imageKit"
import { IdParamsInterface } from "@/types/IdParamsInterface"
import { NextRequest, NextResponse } from "next/server"

export const DELETE = async (
	req: NextRequest,
	{ params }: IdParamsInterface
) => {
	const id = params.id
	const user = await auth(req, "admin")
	if (!user.success) {
		return NextResponse.json(
			{
				success: false,
				message: user.message,
			},
			{
				status: user.status,
			}
		)
	}

	try {
		const findId = await prisma.image.findUnique({
			where: {
				id,
			},
		})

		if (!findId) {
			return NextResponse.json(
				{
					success: false,
					message: "Image dengan id tersebut tidak ditemukan",
				},
				{
					status: 404,
				}
			)
		}

		await imageKit.deleteFile(findId.id)

		await prisma.image.delete({
			where: {
				id,
			},
		})

		return NextResponse.json(
			{
				success: true,
				message: "Image sukses dihapus",
			},
			{
				status: 200,
			}
		)
	} catch (err) {
		const error = err as Error
		return NextResponse.json(
			{
				success: false,
				message: error.message ?? "Terjadi kesalahan pada server",
			},
			{
				status: 500,
			}
		)
	}
}

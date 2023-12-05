import { currentDateTZ } from "@/constants"
import auth from "@/lib/auth"
import { prisma } from "@/lib/db"
import imageKit from "@/lib/imageKit"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
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
		const formData = await req.formData()
		const file = formData.get("image") as Blob | null
		if (!file) {
			return NextResponse.json(
				{
					success: false,
					message: "File tidak ditemukan",
				},
				{
					status: 404,
				}
			)
		}
		if (file.size > 5000000) {
			return NextResponse.json(
				{
					success: false,
					message: "Ukuran file terlalu besar",
				},
				{
					status: 400,
				}
			)
		}
		const split = file.name.split(".")
		const extension = split[split.length - 1]
		const allowedExtension = ["jpg", "jpeg", "png"]

		if (!allowedExtension.includes(extension.toLowerCase())) {
			return NextResponse.json(
				{
					success: false,
					message: `Format file harus ${allowedExtension.toString()}`,
				},
				{
					status: 400,
				}
			)
		}

		const buffer = Buffer.from(await file.arrayBuffer())

		const uploadedImage = await imageKit.upload({
			file: buffer,
			fileName: `IMG-${Date.now()}.${extension}`,
		})

		const createImage = await prisma.image.create({
			data: {
				id: uploadedImage.fileId,
				imageUrl: uploadedImage.url,
				createdAt: currentDateTZ,
				updatedAt: currentDateTZ,
			},
		})
		return NextResponse.json(
			{
				success: true,
				message: "Sukses upload image",
				data: {
					image: createImage,
				},
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

export const GET = async (req: NextRequest) => {
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
		const image = await prisma.image.findMany()
		return NextResponse.json(
			{
				success: true,
				data: {
					image,
				},
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

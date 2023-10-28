import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export const POST = async (req: NextRequest) => {
	const {
		signature_key,
		order_id,
		payment_type,
		gross_amount,
		status_code,
		transaction_status,
	} = await req.json()

	const verifySignature = crypto
		.createHash("sha512")
		.update(
			`${order_id}${status_code}${gross_amount}${process.env.MIDTRANS_SERVER_KEY}`
		)
		.digest("hex")

	if (verifySignature !== signature_key) {
		return NextResponse.json(
			{
				success: false,
				message: "Invalid Signature",
			},
			{
				status: 400,
			}
		)
	}

	if (!order_id) {
		return NextResponse.json(
			{
				message: "Invalid order id",
			},
			{
				status: 400,
			}
		)
	}

	try {
		await prisma.booking.update({
			where: {
				id: order_id,
			},
			data: {
				status: transaction_status,
				amount: Number(gross_amount),
				gross_amount: Number(gross_amount),
				updatedAt: new Date(),
				payment_type: payment_type,
			},
		})
		return NextResponse.json({})
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

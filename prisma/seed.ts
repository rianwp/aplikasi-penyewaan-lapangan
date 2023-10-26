import { PrismaClient } from "@prisma/client"
import adminData from "../lib/adminData"

const prisma = new PrismaClient()

async function main() {
	await prisma.user.create({
		data: adminData,
	})
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

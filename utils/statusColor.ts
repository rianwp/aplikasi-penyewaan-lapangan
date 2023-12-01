import { FAILED_TRANSACTION } from "@/constants"
import { $Enums } from "@prisma/client"

const statusColor = (status: string) => {
	if (status === "success") {
		return "bg-green-500"
	}
	if (FAILED_TRANSACTION.includes(status as $Enums.TransactionStatus)) {
		return "bg-red-600"
	}
	return "bg-yellow-400"
}

export default statusColor

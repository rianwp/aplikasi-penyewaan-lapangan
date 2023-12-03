"use client"

import { useToast } from "@/components/ui/use-toast"
import { getDashboardHeader } from "@/lib/http"
import { DashboardHeaderInterface } from "@/types/DashboardInterface"
import { useQuery } from "@tanstack/react-query"

const DashboardHeader = () => {
	const { toast } = useToast()
	const {
		data: dataHeader,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["getDashboardHeader"],
		queryFn: () => getDashboardHeader(),
	})
	const responseData = dataHeader?.data as DashboardHeaderInterface
	return <div>DashboardHeader</div>
}

export default DashboardHeader

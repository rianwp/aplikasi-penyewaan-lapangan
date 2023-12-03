"use client"

import { getDashboardHeader } from "@/lib/http"
import { DashboardHeaderInterface } from "@/types/DashboardInterface"
import { useQuery } from "@tanstack/react-query"
import DashboardCard from "./DashboardCard"

const DashboardHeader = () => {
	const {
		data: dataHeader,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["getDashboardHeader"],
		queryFn: () => getDashboardHeader(),
	})
	const responseData = (dataHeader?.data
		.header as DashboardHeaderInterface[]) ?? [...Array(4)]
	return (
		<div className="w-full">
			<div className="flex flex-row flex-wrap w-[calc(100%+32px)] -ml-[16px]">
				{responseData.map((data, index) => {
					return (
						<DashboardCard
							key={index}
							data={data}
							isLoading={isPending}
							isError={isError}
							error={error}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default DashboardHeader

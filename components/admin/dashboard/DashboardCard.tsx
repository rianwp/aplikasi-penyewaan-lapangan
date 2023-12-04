import { Skeleton } from "@/components/ui/skeleton"
import { DashboardHeaderInterface } from "@/types/DashboardInterface"

interface DashboardCardPropsInterface {
	data: DashboardHeaderInterface
	isLoading: boolean
	isError: boolean
	error: Error | null
}

const DashboardCard = ({
	data,
	isLoading,
	isError,
	error,
}: DashboardCardPropsInterface) => {
	return (
		<div className="p-4 w-full md:w-1/2 lg:w-1/4 shrink-0">
			<div className="w-full h-full rounded-lg bg-white border flex flex-col gap-y-2 p-6">
				{isLoading ? (
					<>
						<Skeleton className="h-4 my-2.5 w-12" />
						<Skeleton className="h-3.5 my-0.5 w-20" />
					</>
				) : null}
				{!isLoading && !isError ? (
					<>
						<p className="font-bold text-lg text-system-primary">
							{data.value}
						</p>
						<p className="text-sm text-gray-400">{data.title}</p>
					</>
				) : null}
				{!isLoading && isError ? (
					<p className="text-sm font-semibold text-gray-400">
						{error?.message ?? "Terjadi Kesalahan"}
					</p>
				) : null}
			</div>
		</div>
	)
}

export default DashboardCard

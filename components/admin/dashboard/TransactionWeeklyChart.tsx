"use client"

import { getDashboardWeeklyChart } from "@/lib/http"
import {
	DashboardWeeklyChartInterface,
	WeeklyTransactionInterface,
} from "@/types/DashboardInterface"
import formatDate from "@/utils/formatDate"
import { useQuery } from "@tanstack/react-query"
import {
	Chart as ChartJS,
	ChartData,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
	PointElement,
	LineElement,
} from "chart.js"
import { Loader2 } from "lucide-react"
import { Bar } from "react-chartjs-2"

ChartJS.register(
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
	PointElement,
	LineElement
)

const TransactionWeeklyChart = () => {
	const {
		data: dataWeeklyChart,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["getDashboardChart"],
		queryFn: () => getDashboardWeeklyChart(),
	})

	const responseData =
		(dataWeeklyChart?.data as DashboardWeeklyChartInterface) ?? {}

	const chartData: ChartData<
		"bar",
		(number | [number, number] | null)[],
		unknown
	> = {
		labels: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
		datasets: [
			{
				label: "Transaksi Sukses",
				data: Object.keys(responseData.weeklyTransaction ?? {}).map(
					(data) =>
						responseData.weeklyTransaction[
							data as keyof WeeklyTransactionInterface
						]
				),
				backgroundColor: "#5046e5",
			},
		],
	}
	return (
		<div className="w-full flex flex-col gap-y-2">
			<h1 className="text-lg font-semibold text-system-text-primary">
				Transaksi Sukses Minggu Ini
			</h1>
			<div className="lg:w-1/2 w-full aspect-video bg-white rounded-lg p-2 flex flex-col justify-center items-center">
				{isPending ? (
					<Loader2 className="h-10 w-10 animate-spin text-system-primary" />
				) : null}
				{!isPending && !isError ? (
					<>
						<p className="text-sm text-gray-400">
							{formatDate(new Date(responseData.startAt), true)} -{" "}
							{formatDate(new Date(responseData.endAt), true)}
						</p>
						<Bar data={chartData} options={{ responsive: true }} />
					</>
				) : null}
				{!isPending && isError ? (
					<p className="text-sm font-semibold text-gray-400">
						{error?.message ?? "Terjadi Kesalahan"}
					</p>
				) : null}
			</div>
		</div>
	)
}

export default TransactionWeeklyChart

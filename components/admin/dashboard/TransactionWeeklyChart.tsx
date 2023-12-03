"use client"

import { getDashboardWeeklyChart } from "@/lib/http"
import { DashboardWeeklyChartInterface } from "@/types/DashboardInterface"
import { useQuery } from "@tanstack/react-query"
import { Chart as ChartJS, ChartData } from "chart.js/auto"
import { useEffect } from "react"
import { Bar } from "react-chartjs-2"

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
		(dataWeeklyChart?.data
			.weeklyTransaction as DashboardWeeklyChartInterface) ?? {}

	const chartData: ChartData<
		"bar",
		(number | [number, number] | null)[],
		unknown
	> = {
		labels: Object.keys(responseData).map((data) => data),
		datasets: [
			{
				label: "Transaksi Mingguan",
				data: Object.keys(responseData).map(
					(data) => responseData[data as keyof DashboardWeeklyChartInterface]
				),
			},
		],
	}
	return (
		<div className="w-full flex flex-col gap-y-2">
			<h1 className="text-lg font-semibold text-system-text-primary">
				Transaksi Sukses Minggu Ini
			</h1>
			<div className="w-full aspect-video">
				{!isPending && !isError ? <Bar data={chartData} /> : null}
				{!isPending && isError ? <div>Error</div> : null}
			</div>
		</div>
	)
}

export default TransactionWeeklyChart

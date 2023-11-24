"use client"

import { useEffect, useState } from "react"
import LapanganLayout from "../../LapanganLayout"
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { getLapangan } from "@/lib/http"
import { LapanganResponseInterface } from "@/types/LapanganInterface"
import DatePicker from "@/components/DatePicker"
import { Label } from "@/components/ui/label"

const KetersediaanLapanganData = () => {
	const { toast } = useToast()

	const [dateFilter, setDateFilter] = useState<Date | undefined>(new Date())

	useEffect(() => {
		refetch()
	}, [dateFilter])

	const {
		data: dataLapangan,
		isPending,
		isError,
		error,
		refetch,
		isRefetching,
		isRefetchError,
	} = useQuery({
		queryKey: ["getLapangan"],
		refetchOnWindowFocus: false,
		queryFn: () => getLapangan(dateFilter?.toString()),
	})

	const responseData =
		(dataLapangan?.data.lapangan as LapanganResponseInterface[]) ?? []

	useEffect(() => {
		if (!isPending) {
			if (isError) {
				toast({
					title: "Terjadi Kesalahan",
					description: error.message,
					variant: "destructive",
				})
			}
		}
	}, [isPending, isError])

	useEffect(() => {
		if (!isRefetching) {
			if (isRefetchError) {
				toast({
					title: "Terjadi Kesalahan",
					description: error.message,
					variant: "destructive",
				})
			}
		}
	}, [isRefetching, isRefetchError])

	return (
		<div className="mt-5 flex flex-col gap-y-2">
			<div className="flex flex-col gap-y-2">
				<Label>Pilih Tanggal</Label>
				<DatePicker date={dateFilter} onDateChange={setDateFilter} />
			</div>
			<LapanganLayout
				dataLapangan={responseData}
				isLoading={isPending || isRefetching}
			/>
		</div>
	)
}

export default KetersediaanLapanganData

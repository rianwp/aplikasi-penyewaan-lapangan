"use client"

import LapanganLayout from "@/components/LapanganLayout"
import FilterLapangan from "./FilterLapangan"
import { useRecoilValue } from "recoil"
import { FilterInterface } from "@/types/FilterInterface"
import { filterState } from "@/store/app-store"
import { useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { getLapangan } from "@/lib/http"
import formatDate from "@/utils/formatDate"
import { useQuery } from "@tanstack/react-query"
import { LapanganResponseInterface } from "@/types/LapanganInterface"

const SewaData = () => {
	const filter = useRecoilValue<FilterInterface>(filterState)
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
		queryFn: () => getLapangan(formatDate(filter.tanggal)),
	})

	useEffect(() => {
		if (!isPending && !isRefetching) {
			refetch()
		}
	}, [filter.tanggal])

	const responseData =
		(dataLapangan?.data.lapangan as LapanganResponseInterface[]) ?? []

	const filteredData = responseData.filter((data) => {
		if (
			(filter.id_jenislap === "" ||
				filter.id_jenislap === data.JenisLapangan.id) &&
			(filter.id_sesilap === "" || filter.id_sesilap === data.SesiLapangan.id)
		) {
			return true
		} else {
			return false
		}
	})

	useEffect(() => {
		if (!isPending) {
			if (isError) {
				toast({
					title: "Terjadi Kesalahan",
					description: error?.message ?? "",
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
					description: error?.message ?? "",
					variant: "destructive",
				})
			}
		}
	}, [isRefetching, isRefetchError])
	return (
		<div id="booking" className="w-full lg:w-9/12 md:w-10/12 mx-auto px-5">
			<div className="w-full -mt-10">
				<FilterLapangan />
			</div>
			<div className="py-20">
				<LapanganLayout
					dataLapangan={filteredData}
					isLoading={isPending || isRefetching}
					withLink
				/>
			</div>
		</div>
	)
}

export default SewaData

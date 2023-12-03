"use client"

import { useToast } from "@/components/ui/use-toast"
import { getUserBooking } from "@/lib/http"
import { BookingResponseInterface } from "@/types/BookingInterface"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import ItemBooking from "./ItemBooking"
import ItemBookingSkeleton from "./ItemBookingSkeleton"

const ListBooking = () => {
	const { toast } = useToast()

	const {
		data: dataBooking,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["getUserBooking"],
		queryFn: () => getUserBooking(),
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

	const responseData =
		(dataBooking?.data.booking as BookingResponseInterface[]) ?? []

	return (
		<div className="w-full px-6 flex flex-col gap-y-2">
			{!isPending
				? responseData.map((data) => {
						return <ItemBooking data={data} key={data.id} />
				  })
				: [...Array(5)].map((data, index) => {
						return <ItemBookingSkeleton key={index} />
				  })}
			{!isPending && responseData.length === 0 ? (
				<div className="w-full py-10 flex items-center justify-center gap-y-2">
					<p className="text-center text-gray-400 text-lg font-semibold">
						Belum ada Booking
					</p>
					<p className="text-center text-gray-400 text-sm">
						Booking kamu akan muncul disini
					</p>
				</div>
			) : null}
		</div>
	)
}

export default ListBooking

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
		</div>
	)
}

export default ListBooking

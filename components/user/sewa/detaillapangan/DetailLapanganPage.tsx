"use client"

import { useToast } from "@/components/ui/use-toast"
import { getLapanganById, getUserData } from "@/lib/http"
import { LapanganResponseInterface } from "@/types/LapanganInterface"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import no_image from "@/public/no-image.png"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/shadcnUtils"
import { useRouter, useSearchParams } from "next/navigation"
import formatCurrency from "@/utils/formatCurrency"
import { Button } from "@/components/ui/button"
import DatePicker from "@/components/DatePicker"
import formatDate from "@/utils/formatDate"
import { Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import DetailLapanganSkeleton from "./DetailLapanganSkeleton"
import PageNotFound from "../../PageNotFound"
import checkDate from "@/utils/checkDate"
import LoginAlert from "./LoginAlert"
import { useRecoilState } from "recoil"
import { currentOrderState } from "@/store/app-store"
import BookingConfirmation from "./BookingConfirmation"

interface DetailLapanganPagePropsInterface {
	id: string
}

const DetailLapanganPage = ({ id }: DetailLapanganPagePropsInterface) => {
	const { toast } = useToast()
	const searchParams = useSearchParams()
	const [date, setDate] = useState<Date | undefined>(
		new Date(
			checkDate(searchParams.get("tanggal"))
				? new Date(searchParams.get("tanggal") || new Date())
				: new Date()
		)
	)

	const {
		data: dataLapangan,
		isPending,
		isError,
		error,
		isRefetching,
		refetch,
		isRefetchError,
	} = useQuery({
		queryKey: ["getLapanganById"],
		refetchOnWindowFocus: false,
		queryFn: () =>
			getLapanganById(id, formatDate(date || new Date()) || undefined),
	})

	const { data: userData, isFetching: isUserFetching } = useQuery({
		queryKey: ["userData"],
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchInterval: false,
		queryFn: () => getUserData(),
	})

	useEffect(() => {
		if (!isPending && !isRefetching) {
			refetch()
		}
	}, [date])

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

	const responseData =
		(dataLapangan?.data.lapangan as LapanganResponseInterface) ?? []

	const [selectedImage, setSelectedImage] = useState(0)
	const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false)
	const [currentOrder, setCurrentOrder] = useRecoilState(currentOrderState)
	const [isBookingOpen, setIsBookingOpen] = useState(false)

	const handleOrder = () => {
		if (userData.success) {
			setCurrentOrder({
				id_lapangan: responseData.JenisLapangan.id,
				harga: responseData.harga,
				jenis_lapangan: responseData.JenisLapangan.jenis_lapangan,
				jam_mulai: responseData.SesiLapangan.jam_mulai,
				jam_berakhir: responseData.SesiLapangan.jam_berakhir,
				tanggal: formatDate(date || new Date()),
			})
			setIsBookingOpen(true)
		} else {
			setIsLoginAlertOpen(true)
		}
	}

	return (
		<div className="w-full lg:w-9/12 md:w-10/12 mx-auto px-5 flex flex-row flex-wrap gap-y-16">
			{!isPending && !isError ? (
				<>
					<div className="lg:w-3/5 w-full py-4 flex flex-col gap-y-2 lg:pr-4 pr-0">
						<img
							className="w-full aspect-video object-cover rounded-lg overflow-hidden"
							src={
								responseData.JenisLapangan.Image[selectedImage]?.imageUrl ??
								no_image.src
							}
						/>
						<ScrollArea>
							<div className="w-max flex flex-row gap-x-2">
								{responseData.JenisLapangan.Image.map((data, index) => {
									return (
										<button
											className={cn([
												"hover:scale-95 transition duration-300 shrink-0 rounded-lg overflow-hidden",
												index === selectedImage ? "hidden" : "",
											])}
											key={index}
											onClick={() => setSelectedImage(index)}
										>
											<img src={data.imageUrl} className="sm:h-28 h-16" />
										</button>
									)
								})}
							</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
						<h1 className="text-2xl font-bold">
							{responseData.JenisLapangan.jenis_lapangan}
						</h1>
						<p className="text-slate-400">
							{responseData.SesiLapangan.jam_mulai} -{" "}
							{responseData.SesiLapangan.jam_berakhir}
						</p>
						<Separator />
						<div className="flex flex-col gap-x-1">
							<p className="font-bold">Deskripsi</p>
							<p className="text-justify">
								{responseData.JenisLapangan.deskripsi}
							</p>
						</div>
					</div>
					<div className="lg:w-2/5 w-full py-4 lg:pl-4 pl-0">
						<div className="lg:rounded-lg lg:border lg:p-4 py-4 flex flex-col gap-y-2">
							<h1 className="font-bold text-2xl mb-2 lg:block hidden">
								Booking Lapangan
							</h1>
							<DatePicker
								htmlId="tanggal"
								date={date}
								onDateChange={setDate}
								className="lg:w-full w-fit self-end lg:mb-8"
							/>
							<div className="flex flex-row items-center gap-x-0.5">
								<h1 className="text-2xl font-bold">
									Rp. {formatCurrency(responseData.harga)}
								</h1>
								<p className="text-slate-400">/</p>
								<p className="text-slate-400">sesi</p>
							</div>

							<Button
								onClick={responseData.available ? handleOrder : undefined}
								disabled={
									!responseData.available || isRefetching || isUserFetching
								}
								className="w-full bg-client-primary hover:bg-red-800 flex flex-row gap-x-2"
							>
								{isRefetching || isUserFetching ? (
									<Loader2 className="h-5 w-5 animate-spin text-white" />
								) : null}
								{responseData.available ? "Pesan" : "Tidak Tersedia"}
							</Button>
						</div>
					</div>
				</>
			) : null}
			{isPending ? <DetailLapanganSkeleton /> : null}
			{isError ? (
				<PageNotFound error={error?.message ?? "Terjadi Kesalahan"} />
			) : null}
			<LoginAlert
				isOpen={isLoginAlertOpen}
				onOpenChange={setIsLoginAlertOpen}
			/>
			<BookingConfirmation
				isOpen={isBookingOpen}
				onOpenChange={setIsBookingOpen}
			/>
		</div>
	)
}

export default DetailLapanganPage

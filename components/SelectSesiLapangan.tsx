import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { getSesiLapangan } from "@/lib/http"
import { SesiLapanganResponseInterface } from "@/types/SesiLapanganInterface"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

interface SelectSesiLapanganPropsInterface {
	onValueChange: (id: string) => void
	value: string
	className: string
}

const SelectSesiLapangan = ({
	onValueChange,
	value,
	className,
}: SelectSesiLapanganPropsInterface) => {
	const { toast } = useToast()

	const {
		data: dataSesiLapangan,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["getSesiLapangan"],
		queryFn: () => getSesiLapangan(),
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
		(dataSesiLapangan?.data.sesi as SesiLapanganResponseInterface[]) ?? []
	return (
		<Select
			onValueChange={(currentId) =>
				onValueChange(currentId === "unassigned" ? "" : currentId)
			}
			value={value}
		>
			<SelectTrigger disabled={isPending} id="id_sesilap" className={className}>
				<SelectValue placeholder="Pilih Sesi Lapangan" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="unassigned">Pilih Sesi Lapangan</SelectItem>
				{!isPending && !isError
					? responseData.map((data) => {
							return (
								<SelectItem key={data.id} value={data.id}>
									{data.jam_mulai} - {data.jam_berakhir}
								</SelectItem>
							)
					  })
					: null}
			</SelectContent>
		</Select>
	)
}

export default SelectSesiLapangan

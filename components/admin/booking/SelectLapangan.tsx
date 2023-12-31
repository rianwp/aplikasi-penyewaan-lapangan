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
import { getLapangan } from "@/lib/http"
import { LapanganResponseInterface } from "@/types/LapanganInterface"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

interface SelectLapanganPropsInterface {
	onValueChange: (id: string) => void
	value: string
	className: string
}

const SelectLapangan = ({
	onValueChange,
	value,
	className,
}: SelectLapanganPropsInterface) => {
	const { toast } = useToast()

	const {
		data: dataLapangan,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["getLapangan"],
		queryFn: () => getLapangan(),
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
		(dataLapangan?.data.lapangan as LapanganResponseInterface[]) ?? []
	return (
		<Select
			onValueChange={(currentId) =>
				onValueChange(currentId === "unassigned" ? "" : currentId)
			}
			value={value}
		>
			<SelectTrigger
				disabled={isPending}
				id="id_lapangan"
				className={className}
			>
				<SelectValue placeholder="Pilih Lapangan" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="unassigned">Pilih Lapangan</SelectItem>
				{!isPending && !isError
					? responseData.map((data) => {
							return (
								<SelectItem key={data.id} value={data.id}>
									{data.JenisLapangan.jenis_lapangan}{" "}
									{data.SesiLapangan.jam_mulai} -{" "}
									{data.SesiLapangan.jam_berakhir}
								</SelectItem>
							)
					  })
					: null}
			</SelectContent>
		</Select>
	)
}

export default SelectLapangan

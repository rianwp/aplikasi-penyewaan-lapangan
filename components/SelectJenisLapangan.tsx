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
import { getJenisLapangan } from "@/lib/http"
import { JenisLapanganResponseInterface } from "@/types/JenisLapanganInterface"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

interface SelectJenisLapanganPropsInterface {
	onValueChange: (id: string) => void
	value: string
	className: string
}

const SelectJenisLapangan = ({
	onValueChange,
	value,
	className,
}: SelectJenisLapanganPropsInterface) => {
	const { toast } = useToast()

	const {
		data: dataJenisLapangan,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["getJenisLapangan"],
		queryFn: () => getJenisLapangan(),
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
		(dataJenisLapangan?.data
			.jenisLapangan as JenisLapanganResponseInterface[]) ?? []
	return (
		<Select
			onValueChange={(currentId) =>
				onValueChange(currentId === "unassigned" ? "" : currentId)
			}
			value={value}
		>
			<SelectTrigger
				disabled={isPending}
				id="id_jenislap"
				className={className}
			>
				<SelectValue placeholder="Pilih Jenis Lapangan" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="unassigned">Pilih Jenis Lapangan</SelectItem>
				{!isPending && !isError
					? responseData.map((data) => {
							return (
								<SelectItem key={data.id} value={data.id}>
									{data.jenis_lapangan}
								</SelectItem>
							)
					  })
					: null}
			</SelectContent>
		</Select>
	)
}

export default SelectJenisLapangan

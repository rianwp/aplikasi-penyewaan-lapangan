import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
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
}

const SelectJenisLapangan = ({
	onValueChange,
	value,
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
			onValueChange={(currentId) => onValueChange(currentId)}
			value={value}
		>
			<SelectTrigger
				disabled={isPending}
				id="id_jenislap"
				className="sm:w-3/4 w-full shrink-0"
			>
				<SelectValue placeholder="Pilih Jenis Lapangan" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{!isPending && !isError
						? responseData.map((data) => {
								return (
									<SelectItem key={data.id} value={data.id}>
										{data.jenis_lapangan}
									</SelectItem>
								)
						  })
						: null}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

export default SelectJenisLapangan

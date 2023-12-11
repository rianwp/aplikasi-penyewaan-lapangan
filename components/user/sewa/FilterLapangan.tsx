import DatePicker from "@/components/DatePicker"
import SelectJenisLapangan from "@/components/SelectJenisLapangan"
import SelectSesiLapangan from "@/components/SelectSesiLapangan"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { filterState } from "@/store/app-store"
import { FilterInterface } from "@/types/FilterInterface"
import handleObjectState from "@/utils/handleObjectState"
import { useState } from "react"
import { useRecoilState } from "recoil"

const FilterLapangan = () => {
	const [filter, setFilter] = useRecoilState<FilterInterface>(filterState)
	const [tempFilter, setTempFilter] = useState(filter)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setFilter(tempFilter)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex lg:flex-row flex-col w-full bg-white rounded-lg border border-border shadow-lg p-2"
		>
			<div className="w-full flex lg:flex-row flex-col">
				<div className="p-4 lg:w-1/3 w-full">
					<div className="flex flex-col gap-y-2">
						<Label htmlFor="tanggal" className="w-fit">
							Pilih Tanggal
						</Label>
						<DatePicker
							htmlId="tanggal"
							date={tempFilter.tanggal}
							onDateChange={(date) =>
								handleObjectState("tanggal", date, setTempFilter)
							}
							className="w-full"
						/>
					</div>
				</div>
				<div className="p-4 lg:w-1/3 w-full">
					<div className="flex flex-col gap-y-2">
						<Label htmlFor="id_sesilap" className="w-fit">
							Sesi Lapangan
						</Label>
						<SelectSesiLapangan
							className="w-full"
							value={tempFilter.id_sesilap}
							onValueChange={(value) =>
								handleObjectState("id_sesilap", value, setTempFilter)
							}
						/>
					</div>
				</div>
				<div className="p-4 lg:w-1/3 w-full">
					<div className="flex flex-col gap-y-2">
						<Label htmlFor="id_jenislap" className="w-fit">
							Jenis Lapangan
						</Label>
						<SelectJenisLapangan
							className="w-full"
							value={tempFilter.id_jenislap}
							onValueChange={(value) =>
								handleObjectState("id_jenislap", value, setTempFilter)
							}
						/>
					</div>
				</div>
			</div>
			<div className="shrink-0 p-4 self-end">
				<Button type="submit">Cari</Button>
			</div>
		</form>
	)
}

export default FilterLapangan

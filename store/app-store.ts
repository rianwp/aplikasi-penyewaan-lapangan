import { currentDateTZ } from "@/constants"
import { BookingConfirmationInterface } from "@/types/BookingInterface"
import { FilterInterface } from "@/types/FilterInterface"
import { UserEditRequestInterface } from "@/types/UserInterface"
import formatDate from "@/utils/formatDate"
import { atom } from "recoil"

export const filterState = atom<FilterInterface>({
	key: "filterState",
	default: {
		tanggal: currentDateTZ,
		id_jenislap: "",
		id_sesilap: "",
	},
})

export const currentOrderState = atom<BookingConfirmationInterface>({
	key: "currentOrderState",
	default: {
		id_lapangan: "",
		tanggal: formatDate(currentDateTZ),
		jenis_lapangan: "",
		jam_mulai: "",
		jam_berakhir: "",
		harga: 0,
	},
})

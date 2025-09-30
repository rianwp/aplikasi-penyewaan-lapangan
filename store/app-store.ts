import { currentDateTZ } from "@/constants"
import {
	BatchBookingConfirmationInterface,
	BookingConfirmationInterface,
} from "@/types/BookingInterface"
import { FilterInterface } from "@/types/FilterInterface"
import { UserEditRequestInterface } from "@/types/UserInterface"
import formatDate from "@/utils/formatDate"
import { atom } from "recoil"

export const filterState = atom<FilterInterface>({
	key: "filterState",
	default: {
		tanggal: new Date(),
		id_jenislap: "",
		id_sesilap: "",
	},
})

export const currentOrderState = atom<BatchBookingConfirmationInterface>({
	key: "currentOrderState",
	default: {
		lapangan: [],
		tanggal: formatDate(new Date()),
	},
})

export const isBookingOpenState = atom<boolean>({
	key: "isBookingOpenState",
	default: false,
})

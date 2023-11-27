import { FilterInterface } from "@/types/FilterInterface"
import { atom } from "recoil"

export const filterState = atom<FilterInterface>({
	key: "filterState",
	default: {
		tanggal: new Date(),
		id_jenislap: "",
		id_sesilap: "",
	},
})

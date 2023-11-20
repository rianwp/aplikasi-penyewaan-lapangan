import { JenisLapanganRequestInterface } from "@/types/JenisLapanganInterface"
import { LoginInterface } from "@/types/LoginInterface"
import { SesiLapanganRequestInterface } from "@/types/SesiLapanganInterface"
import axios, { AxiosError } from "axios"

export const getAdminData = async () => {
	try {
		const response = await axios.get("/api/auth/admins/me")
		return response.data
	} catch (err) {
		const error = err as AxiosError
		if (error.code === "500") {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
		throw error.response?.data
	}
}

export const login = async (data: LoginInterface) => {
	try {
		const response = await axios.post("/api/auth/login", data)
		return response.data
	} catch (err) {
		const error = err as AxiosError
		if (error.code === "500") {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
		throw error.response?.data
	}
}

export const logout = async () => {
	try {
		const response = await axios.post("/api/auth/logout")
		return response.data
	} catch (err) {
		const error = err as AxiosError
		if (error.code === "500") {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
		throw error.response?.data
	}
}

export const getSesiLapangan = async () => {
	try {
		const response = await axios.get("/api/lapangan/sesi")
		return response.data
	} catch (err) {
		const error = err as AxiosError
		if (error.code === "500") {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
		throw error.response?.data
	}
}

export const addSesiLapangan = async (data: SesiLapanganRequestInterface) => {
	try {
		const response = await axios.post("/api/lapangan/sesi", data)
		return response.data
	} catch (err) {
		const error = err as AxiosError
		if (error.code === "500") {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
		throw error.response?.data
	}
}

export const editSesiLapangan = async (
	id: string,
	data: SesiLapanganRequestInterface
) => {
	try {
		const response = await axios.put(`/api/lapangan/sesi/${id}`, data)
		return response.data
	} catch (err) {
		const error = err as AxiosError
		if (error.code === "500") {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
		throw error.response?.data
	}
}

export const deleteSesiLapangan = async (id: string) => {
	try {
		const response = await axios.delete(`/api/lapangan/sesi/${id}`)
		return response.data
	} catch (err) {
		const error = err as AxiosError
		if (error.code === "500") {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
		throw error.response?.data
	}
}

export const getJenisLapangan = async () => {
	try {
		const response = await axios.get("/api/lapangan/jenis")
		return response.data
	} catch (err) {
		const error = err as AxiosError
		if (error.code === "500") {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
		throw error.response?.data
	}
}

export const addJenisLapangan = async (data: JenisLapanganRequestInterface) => {
	try {
		const response = await axios.post("/api/lapangan/jenis", data)
		return response.data
	} catch (err) {
		const error = err as AxiosError
		if (error.code === "500") {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
		throw error.response?.data
	}
}

export const editJenisLapangan = async (
	id: string,
	data: JenisLapanganRequestInterface
) => {
	try {
		const response = await axios.put(`/api/lapangan/jenis/${id}`, data)
		return response.data
	} catch (err) {
		const error = err as AxiosError
		if (error.code === "500") {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
		throw error.response?.data
	}
}

export const deleteJenisLapangan = async (id: string) => {
	try {
		const response = await axios.delete(`/api/lapangan/jenis/${id}`)
		return response.data
	} catch (err) {
		const error = err as AxiosError
		if (error.code === "500") {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
		throw error.response?.data
	}
}

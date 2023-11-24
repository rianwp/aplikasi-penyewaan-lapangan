import { JenisLapanganRequestInterface } from "@/types/JenisLapanganInterface"
import { LapanganRequestInterface } from "@/types/LapanganInterface"
import { LoginInterface } from "@/types/LoginInterface"
import { SesiLapanganRequestInterface } from "@/types/SesiLapanganInterface"
import axios, { AxiosError } from "axios"

export const getAdminData = async () => {
	try {
		const response = await axios.get("/api/auth/admins/me")
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const loginAdmin = async (data: LoginInterface) => {
	try {
		const response = await axios.post("/api/auth/admins/login", data)
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const loginUser = async (data: LoginInterface) => {
	try {
		const response = await axios.post("/api/auth/users/login", data)
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const logout = async () => {
	try {
		const response = await axios.post("/api/auth/logout")
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const getSesiLapangan = async () => {
	try {
		const response = await axios.get("/api/lapangan/sesi")
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const addSesiLapangan = async (data: SesiLapanganRequestInterface) => {
	try {
		const response = await axios.post("/api/lapangan/sesi", data)
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
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
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const deleteSesiLapangan = async (id: string) => {
	try {
		const response = await axios.delete(`/api/lapangan/sesi/${id}`)
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const getJenisLapangan = async () => {
	try {
		const response = await axios.get("/api/lapangan/jenis")
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const addJenisLapangan = async (data: JenisLapanganRequestInterface) => {
	try {
		const response = await axios.post("/api/lapangan/jenis", data)
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
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
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const deleteJenisLapangan = async (id: string) => {
	try {
		const response = await axios.delete(`/api/lapangan/jenis/${id}`)
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const uploadImageLapangan = async (image: Blob) => {
	const formData = new FormData()
	formData.append("image", image)
	try {
		const response = await axios.post("/api/lapangan/jenis/images", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const deleteImageLapangan = async (id: string) => {
	try {
		const response = await axios.delete(`/api/lapangan/jenis/images/${id}`)
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const getImageLapangan = async () => {
	try {
		const response = await axios.get("/api/lapangan/jenis/images")
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const getLapangan = async () => {
	try {
		const response = await axios.get("/api/lapangan")
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const addLapangan = async (data: LapanganRequestInterface) => {
	try {
		const response = await axios.post("/api/lapangan", data)
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const editLapangan = async (
	id: string,
	data: LapanganRequestInterface
) => {
	try {
		const response = await axios.put(`/api/lapangan/${id}`, data)
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

export const deleteLapangan = async (id: string) => {
	try {
		const response = await axios.delete(`/api/lapangan/${id}`)
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			const error = err as AxiosError
			if (error.code === "500") {
				throw {
					success: false,
					message: "Terjadi Kesalahan",
				}
			}
			throw error.response?.data
		} else {
			throw {
				success: false,
				message: "Terjadi Kesalahan",
			}
		}
	}
}

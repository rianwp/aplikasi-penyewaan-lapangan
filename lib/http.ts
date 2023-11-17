import { LoginInterface } from "@/types/login"
import axios, { AxiosError } from "axios"

export const getAdminData = async () => {
	try {
		const response = await axios.get("/api/auth/admins/me")
		return response.data
	} catch (err) {
		const error = err as AxiosError
		throw error.response?.data
	}
}

export const login = async (data: LoginInterface) => {
	try {
		const response = await axios.post("/api/auth/login", data, {
			withCredentials: true,
		})
		return response.data
	} catch (err) {
		const error = err as AxiosError
		throw error.response?.data
	}
}

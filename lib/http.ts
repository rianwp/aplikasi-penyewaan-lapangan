import { LoginInterface } from "@/types/LoginInterface"
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
		const response = await axios.post("/api/auth/login", data)
		return response.data
	} catch (err) {
		const error = err as AxiosError
		throw error.response?.data
	}
}

export const logout = async () => {
	try {
		const response = await axios.post("/api/auth/logout")
		return response.data
	} catch (err) {
		const error = err as AxiosError
		throw error.response?.data
	}
}

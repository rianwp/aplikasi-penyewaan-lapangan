import { getAdminData, getUserData } from "@/lib/http"
import { useQuery } from "@tanstack/react-query"

const useAuth = (role: "admin" | "user") => {
	const { data, isFetching } = useQuery({
		queryKey: [role === "admin" ? "adminData" : "userData"],
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchInterval: false,
		retry: 2,
		queryFn: () => (role === "admin" ? getAdminData() : getUserData()),
	})
	return { data, isFetching }
}

export default useAuth

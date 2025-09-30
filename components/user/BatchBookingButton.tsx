import { useRecoilState } from "recoil"
import { isBookingOpenState } from "@/store/app-store"
import { ShoppingCart } from "lucide-react"
import useAuth from "@/hooks/useAuth"

const BatchBookingButton = () => {
	const [isBookingOpen, setIsBookingOpen] = useRecoilState(isBookingOpenState)
	const { data, isFetching } = useAuth("user")

	return (
		<>
			{!isFetching && data?.success ? (
				<button onClick={() => setIsBookingOpen(true)}>
					<ShoppingCart className="h-4 w-4" />
				</button>
			) : null}
		</>
	)
}

export default BatchBookingButton

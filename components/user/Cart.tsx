import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"

const Cart = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<ShoppingCart />
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Cart</SheetTitle>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}

export default Cart

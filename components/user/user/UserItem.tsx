import { cn } from "@/lib/shadcnUtils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface UserItemPropsInterface {
	children: React.ReactNode
	link: string
}

const UserItem = ({ children, link }: UserItemPropsInterface) => {
	const pathname = usePathname()
	const isActive = (path: string) => path === pathname
	return (
		<Link
			href={link}
			className={cn([
				"font-semibold text-sm block transition duration-300 rounded-lg px-3 py-2",
				isActive(link)
					? "bg-client-primary text-white"
					: "text-primary hover:bg-client-primary hover:text-white",
			])}
		>
			{children}
		</Link>
	)
}

export default UserItem

import { SidebarItemInterface } from "@/types/sidebarItem"
import { useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { usePathname } from "next/navigation"

interface SidebarItemPropsInterface {
	name: string
	link?: string
	icon: React.ReactElement
	items?: SidebarItemInterface[]
}

const SidebarItem = ({
	name,
	link,
	icon,
	items,
}: SidebarItemPropsInterface) => {
	const pathname = usePathname()
	const [openItems, setOpenItems] = useState(false)
	const openItemsClassName = openItems ? "rotate-180" : "rotate-0"
	const isActive = (path: string) => path === pathname

	if (items) {
		const itemsList = items.map((data, index) => {
			return (
				<a
					key={index}
					href={data.link}
					className={`${
						isActive(data.link)
							? "text-white bg-system-primary"
							: "text-system-text-primary/60 hover:text-white hover:bg-system-primary"
					}  rounded-lg transition duration-300 flex flex-row gap-x-5 items-center w-full pl-16 py-3 pr-6`}
				>
					<p className="text-base font-normal">{data.name}</p>
				</a>
			)
		})
		return (
			<>
				<button
					onClick={() => setOpenItems(!openItems)}
					className="text-system-text-primary/60 hover:text-white hover:bg-system-primary rounded-lg transition duration-300 flex flex-row gap-x-5 items-center w-full py-3 px-6"
				>
					<div className="w-5 h-5 shrink-0">{icon}</div>
					<div className="flex flex-row justify-between w-full items-center">
						<p className="text-base font-normal">{name}</p>
						<BsChevronDown
							className={`${openItemsClassName} transition-transform duration-300 w-4 h-4`}
						/>
					</div>
				</button>
				{openItems ? itemsList : null}
			</>
		)
	}
	return (
		<a
			href={link}
			className={`${
				isActive(link || "")
					? "text-white bg-system-primary"
					: "text-system-text-primary/60 hover:text-white hover:bg-system-primary"
			} rounded-lg transition duration-300 flex flex-row gap-x-5 items-center w-full py-3 px-6`}
		>
			<div className="w-5 h-5 shrink-0">{icon}</div>
			<p className="text-base font-normal">{name}</p>
		</a>
	)
}

export default SidebarItem

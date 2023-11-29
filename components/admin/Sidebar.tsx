import Brand from "./Brand"
import {
	BsCalendarWeek,
	BsChevronLeft,
	BsFileEarmark,
	BsJournals,
	BsSpeedometer2,
	BsTable,
} from "react-icons/bs"
import SidebarItem from "./SidebarItem"

interface SidebarPropsInterface {
	onClose: () => void
}

const sidebarItems = [
	{
		name: "Dashboard",
		link: "/admin/dashboard",
		icon: <BsSpeedometer2 className="w-full h-full" />,
	},
	{
		name: "Lapangan",
		icon: <BsTable className="w-full h-full" />,
		items: [
			{
				name: "Lapangan",
				link: "/admin/lapangan",
			},
			{
				name: "Jenis Lapangan",
				link: "/admin/lapangan/jenis",
			},
			{
				name: "Sesi Lapangan",
				link: "/admin/lapangan/sesi",
			},
		],
	},
	{
		name: "Booking",
		link: "/admin/booking",
		icon: <BsJournals className="w-full h-full" />,
	},
	{
		name: "Ketersediaan Lapangan",
		link: "/admin/ketersediaan",
		icon: <BsCalendarWeek className="w-full h-full" />,
	},
	{
		name: "Laporan",
		link: "/admin/laporan",
		icon: <BsFileEarmark className="w-full h-full" />,
	},
]

const Sidebar = ({ onClose }: SidebarPropsInterface) => {
	return (
		<div className="bg-white flex flex-col items-start w-full h-full overflow-y-auto">
			<div className="bg-system-primary md:hidden flex flex-row items-center justify-between w-full h-16 shrink-0 p-5">
				<Brand />
				<button onClick={onClose}>
					<BsChevronLeft className="text-white/60 align-middle w-4 h-4 hover:text-white/100 transition duration-300" />
				</button>
			</div>
			<div className="p-5 flex flex-col items-start w-full h-full gap-y-1">
				{sidebarItems.map((data, index) => {
					return (
						<SidebarItem
							key={index}
							name={data.name}
							icon={data.icon}
							link={data.link}
							items={data.items}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Sidebar

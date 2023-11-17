import { BsList } from "react-icons/bs"
import Brand from "./Brand"
import ProfileAvatar from "./ProfileAvatar"

interface NavbarPropsInterface {
	onOpenSidebar: () => void
}

const Navbar = ({ onOpenSidebar }: NavbarPropsInterface) => {
	return (
		<nav className="fixed w-full top-0 py-2 px-5 bg-system-primary shrink-0 h-16 flex flex-row justify-between items-center">
			<div className="flex flex-row gap-x-2">
				<button className="md:hidden block" onClick={onOpenSidebar}>
					<BsList className="text-white/60 align-middle w-5 h-5 hover:text-white/100 transition duration-300" />
				</button>
				<div className="md:block hidden">
					<Brand />
				</div>
			</div>
			<ProfileAvatar />
		</nav>
	)
}

export default Navbar

import { BsList } from "react-icons/bs"
import ProfileAvatar from "../ProfileAvatar"

interface NavbarPropsInterface {
	onOpenMenu: () => void
}

const Navbar = ({ onOpenMenu }: NavbarPropsInterface) => {
	return (
		<nav className="fixed w-full top-0 py-2 px-5 bg-white shrink-0 h-16 flex flex-row justify-between items-center">
			<div className="">Brand</div>
			<button className="md:hidden block" onClick={onOpenMenu}>
				<BsList className="text-white/60 align-middle w-5 h-5 hover:text-white/100 transition duration-300" />
			</button>
			<div className="flex-row gap-x-2 hidden md:flex">
				{/* <ProfileAvatar role="user" /> */}
			</div>
		</nav>
	)
}

export default Navbar

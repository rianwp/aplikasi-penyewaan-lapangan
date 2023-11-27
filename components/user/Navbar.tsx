import ProfileAvatar from "../ProfileAvatar"
import Brand from "./Brand"
import Cart from "./Cart"

const Navbar = () => {
	return (
		<nav className="fixed w-full top-0 py-2 px-5 bg-white shrink-0 h-16 flex flex-row justify-center items-center border-b border-border">
			<div className="flex flex-row justify-between items-center lg:w-9/12 md:w-10/12 w-full">
				<Brand />
				<div className="flex flex-row items-center gap-x-2">
					<Cart />
					<ProfileAvatar role="user" />
				</div>
			</div>
		</nav>
	)
}

export default Navbar

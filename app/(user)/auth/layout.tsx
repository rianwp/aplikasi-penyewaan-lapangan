interface LayoutPropsInterface {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutPropsInterface) => {
	return (
		<div className="w-full h-screen flex justify-center items-center bg-auth bg-cover">
			{children}
		</div>
	)
}

export default Layout

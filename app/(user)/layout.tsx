interface LayoutPropsInterface {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutPropsInterface) => {
	return <>{children}</>
}

export default Layout
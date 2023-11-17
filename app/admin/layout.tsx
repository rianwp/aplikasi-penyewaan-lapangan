interface LayoutPropsInterface {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutPropsInterface) => {
	return <div className="font-system-ui">{children}</div>
}

export default Layout

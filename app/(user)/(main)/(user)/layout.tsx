import UserLayout from "@/components/user/user/UserLayout"

interface LayoutPropsInterface {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutPropsInterface) => {
	return <UserLayout>{children}</UserLayout>
}

export default Layout

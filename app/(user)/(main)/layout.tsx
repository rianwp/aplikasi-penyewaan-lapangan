import MainLayout from "@/components/user/MainLayout"

interface LayoutPropsInterface {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutPropsInterface) => {
	return <MainLayout>{children}</MainLayout>
}

export default Layout

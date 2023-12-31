import GlobalProvider from "@/components/GlobalProvider"
import "./globals.css"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/shadcnUtils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
})

export const metadata: Metadata = {
	title: "Margajaya App",
	description: "Aplikasi Penyewaan Lapangan Badminton",
	icons: "/favicon.ico",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<GlobalProvider>
			<html lang="en">
				<body
					className={cn(
						"min-h-screen bg-background font-sans antialiased overflow-y-auto scroll-smooth",
						fontSans.variable
					)}
				>
					<ScrollArea className="h-screen w-full">
						<div className="w-screen">{children}</div>
						<ScrollBar
							orientation="vertical"
							hidden={false}
							className="bg-primary-foreground z-50"
						/>
					</ScrollArea>
					<Toaster />
				</body>
			</html>
		</GlobalProvider>
	)
}

export default RootLayout

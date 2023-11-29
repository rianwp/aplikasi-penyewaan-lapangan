"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RecoilRoot } from "recoil"

interface GlobalProviderPropsInterface {
	children: React.ReactNode
}

const queryClient = new QueryClient()

const GlobalProvider = ({ children }: GlobalProviderPropsInterface) => {
	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>{children}</RecoilRoot>
		</QueryClientProvider>
	)
}

export default GlobalProvider

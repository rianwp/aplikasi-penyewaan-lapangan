"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface GlobalProviderPropsInterface {
	children: React.ReactNode
}

const queryClient = new QueryClient()

const GlobalProvider = ({ children }: GlobalProviderPropsInterface) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

export default GlobalProvider

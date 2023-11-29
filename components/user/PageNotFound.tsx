interface PageNotFoundPropsInterface {
	error: string
}

const PageNotFound = ({ error }: PageNotFoundPropsInterface) => {
	return (
		<div className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center">
			<div className="md:w-1/2 w-4/5">
				<h1 className="text-3xl font-bold  text-client-primary">
					Ups Terjadi Kesalahan
				</h1>
				<h1 className="text-2xl font-bold text-black">{error}</h1>
			</div>
		</div>
	)
}

export default PageNotFound

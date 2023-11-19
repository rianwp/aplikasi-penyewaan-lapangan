import React from "react"

interface BreadcrumbPropsInterface {
	name: string
}

const Breadcrumb = ({ name }: BreadcrumbPropsInterface) => {
	return (
		<div className="flex flex-row items-center gap-x-2 text-system-text-primary/60 font-normal">
			<a
				className="hover:text-system-text-primary transition duration-300"
				href="/admin/dashboard"
			>
				Home
			</a>
			<p>/</p>
			<p>{name}</p>
		</div>
	)
}

export default Breadcrumb

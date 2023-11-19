"use client"

import { BsPlus } from "react-icons/bs"
import { Button } from "../ui/button"
import { useState } from "react"

interface TablePropsInterface {
	header: string[]
	tableData: any[]
	onEdit: (index: number) => void
	onDelete: (index: number) => void
	onAdd: () => void
	isLoading: boolean
}

const Table = ({
	header,
	tableData,
	onEdit,
	onDelete,
	onAdd,
	isLoading,
}: TablePropsInterface) => {
	const [currentPageIndex, setCurrentPageIndex] = useState(0)
	const dataLengthPerPage = 10
	const pageLength = Math.ceil(tableData.length / dataLengthPerPage)
	const filteredData = tableData.filter(
		(data, index) =>
			index >= dataLengthPerPage * currentPageIndex &&
			index < dataLengthPerPage * (currentPageIndex + 1)
	)

	const handlePageChange = (index: number) => {
		if (index < pageLength) setCurrentPageIndex(index)
	}
	return (
		<div className="mt-5 flex flex-col gap-y-2">
			<Button
				onClick={onAdd}
				className="w-fit flex flex-row items-center gap-x-1 bg-system-button-primary hover:bg-system-button-primary_hover text-white self-end"
				size="sm"
			>
				<BsPlus className="w-5 h-5" />
				<p>Tambah</p>
			</Button>
			<div className="flex flex-col bg-primary-foreground border border-slate-200 rounded-lg">
				<div className="overflow-x-auto">
					<div className="min-w-full inline-block align-middle">
						<div className="overflow-hidden">
							<table className="min-w-full h-full divide-y divide-gray-200">
								<thead>
									<tr>
										{header.map((data, index) => {
											return (
												<th
													key={index}
													scope="col"
													className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
												>
													{data}
												</th>
											)
										})}
										<th
											scope="col"
											className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
										>
											Action
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
									{filteredData.map((data, index) => {
										return (
											<tr key={index}>
												{Object.keys(data).map((dataKey, indexKey) => {
													return (
														<td
															key={indexKey}
															className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
														>
															{data[dataKey]}
														</td>
													)
												})}
												<td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex flex-row gap-x-1 justify-end">
													<button
														type="button"
														onClick={() => onEdit(index)}
														className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
													>
														Edit
													</button>
													<p>|</p>
													<button
														type="button"
														onClick={() => onDelete(index)}
														className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-system-danger hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none"
													>
														Delete
													</button>
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-x-2 items-center">
				{[...Array(pageLength)].map((data, index) => {
					return (
						<Button
							className="bg-system-button-primary hover:bg-system-button-primary_hover"
							onClick={() => handlePageChange(index)}
							key={index}
						>
							{index + 1}
						</Button>
					)
				})}
				<p className="text-system-text-primary/60">
					Menampilkan {filteredData.length} data
				</p>
			</div>
		</div>
	)
}

export default Table

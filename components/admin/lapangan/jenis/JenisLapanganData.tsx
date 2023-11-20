"use client"

import { useEffect, useState } from "react"
import Table from "../../Table"
import AddJenisLapangan from "./AddJenisLapangan"
import EditJenisLapangan from "./EditJenisLapangan"
import handleObjectState from "@/utils/handleObjectState"
import DeleteData from "../../DeleteData"
import { deleteJenisLapangan, getJenisLapangan } from "@/lib/http"
import { useQuery } from "@tanstack/react-query"
import { JenisLapanganResponseInterface } from "@/types/JenisLapanganInterface"
import { useToast } from "@/components/ui/use-toast"

const header = ["no", "jam mulai", "jam berakhir"]

const SesiLapanganData = () => {
	const { toast } = useToast()

	const {
		data: dataJenisLapangan,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["getJenisLapangan"],
		queryFn: () => getJenisLapangan(),
	})

	const responseData =
		(dataJenisLapangan?.data
			.jenisLapangan as JenisLapanganResponseInterface[]) ?? []
	const tableData = responseData.map((data, index) => {
		const { id, createdAt, updatedAt, ...dataForTable } = data
		return {
			no: index + 1,
			...dataForTable,
		}
	})

	useEffect(() => {
		if (!isPending) {
			if (isError) {
				toast({
					title: "Terjadi Kesalahan",
					description: error.message,
					variant: "destructive",
				})
			}
		}
	}, [isPending, isError])

	const [addDataOpen, setAddDataOpen] = useState(false)
	const [editData, setEditData] = useState<{
		open: boolean
		currentData: JenisLapanganResponseInterface
	}>({
		open: false,
		currentData: {
			id: "",
			images: [],
			jenis_lapangan: "",
			deskripsi: "",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	})
	const [deleteData, setDeleteData] = useState({
		open: false,
		index: 0,
	})

	const handleEdit = (index: number) => {
		setEditData({
			open: true,
			currentData: responseData[index],
		})
	}

	const handleDelete = (index: number) => {
		setDeleteData({
			open: true,
			index,
		})
	}
	return (
		<>
			<Table
				header={header}
				onDelete={(index) => handleDelete(index)}
				onEdit={(index) => handleEdit(index)}
				onAdd={() => setAddDataOpen(true)}
				tableData={tableData}
				isLoading={isPending}
			/>
			<AddJenisLapangan
				isOpen={addDataOpen}
				onOpenChange={(open) => setAddDataOpen(open)}
			/>
			<EditJenisLapangan
				currentData={editData.currentData}
				isOpen={editData.open}
				onOpenChange={(open) => handleObjectState("open", open, setEditData)}
			/>
			<DeleteData
				onOpenChange={(open) => handleObjectState("open", open, setDeleteData)}
				isOpen={deleteData.open}
				deleteAction={() =>
					deleteJenisLapangan(responseData[deleteData.index].id)
				}
			/>
		</>
	)
}

export default SesiLapanganData

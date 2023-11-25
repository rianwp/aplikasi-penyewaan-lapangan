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
import ImageList from "./ImageList"

const header = ["no", "jenis lapangan", "deskripsi", "foto"]

const JenisLapanganData = () => {
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

	useEffect(() => {
		if (!isPending) {
			if (isError) {
				toast({
					title: "Terjadi Kesalahan",
					description: error?.message ?? "",
					variant: "destructive",
				})
			}
		}
	}, [isPending, isError])

	const responseData =
		(dataJenisLapangan?.data
			.jenisLapangan as JenisLapanganResponseInterface[]) ?? []

	const tableData = responseData.map((data, index) => {
		return {
			id: data.id,
			fields: {
				no: index + 1,
				jenis_lapangan: data.jenis_lapangan,
				deskripsi: data.deskripsi,
				images: <ImageList images={data.Image} />,
			},
		}
	})

	const [addDataOpen, setAddDataOpen] = useState(false)
	const [editData, setEditData] = useState<{
		open: boolean
		currentData: JenisLapanganResponseInterface
	}>({
		open: false,
		currentData: {
			id: "",
			Image: [],
			jenis_lapangan: "",
			deskripsi: "",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	})
	const [deleteData, setDeleteData] = useState({
		open: false,
		id: "",
	})

	const handleEdit = (id: string) => {
		setEditData({
			open: true,
			currentData: responseData.find(
				(data) => data.id === id
			) as JenisLapanganResponseInterface,
		})
		console.log(responseData.find((data) => data.id === id))
		console.log(id)
	}

	const handleDelete = (id: string) => {
		setDeleteData({
			open: true,
			id,
		})
	}
	return (
		<>
			<Table
				header={header}
				onDelete={(id) => handleDelete(id)}
				onEdit={(id) => handleEdit(id)}
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
					deleteJenisLapangan(
						(
							responseData.find(
								(data) => data.id === deleteData.id
							) as JenisLapanganResponseInterface
						).id
					)
				}
				mutationKey="deleteJenisLapangan"
				invalidateKey="getJenisLapangan"
			/>
		</>
	)
}

export default JenisLapanganData

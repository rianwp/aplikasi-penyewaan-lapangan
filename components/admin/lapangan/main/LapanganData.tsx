"use client"

import { useToast } from "@/components/ui/use-toast"
import LapanganLayout from "../../LapanganLayout"
import { useQuery } from "@tanstack/react-query"
import { deleteLapangan, getLapangan } from "@/lib/http"
import { LapanganResponseInterface } from "@/types/LapanganInterface"
import { useEffect, useState } from "react"
import AddLapangan from "./AddLapangan"
import EditLapangan from "./EditLapangan"
import handleObjectState from "@/utils/handleObjectState"
import DeleteData from "../../DeleteData"

const LapanganData = () => {
	const { toast } = useToast()

	const {
		data: dataLapangan,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["getLapangan"],
		queryFn: () => getLapangan(),
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

	const responseData =
		(dataLapangan?.data.lapangan as LapanganResponseInterface[]) ?? []

	const [addDataOpen, setAddDataOpen] = useState(false)
	const [editData, setEditData] = useState<{
		open: boolean
		currentData: LapanganResponseInterface
	}>({
		open: false,
		currentData: {
			id: "",
			harga: 0,
			JenisLapangan: {
				id: "",
				deskripsi: "",
				Image: [],
				jenis_lapangan: "",
			},
			SesiLapangan: {
				id: "",
				jam_mulai: "",
				jam_berakhir: "",
			},
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
			) as LapanganResponseInterface,
		})
	}

	const handleDelete = (id: string) => {
		setDeleteData({
			open: true,
			id,
		})
	}

	return (
		<>
			<LapanganLayout
				onAdd={() => setAddDataOpen(true)}
				dataLapangan={responseData}
				onDelete={(id) => handleDelete(id)}
				onEdit={(id) => handleEdit(id)}
				isLoading={isPending}
			/>
			<AddLapangan
				isOpen={addDataOpen}
				onOpenChange={(open) => setAddDataOpen(open)}
			/>
			<EditLapangan
				currentData={editData.currentData}
				isOpen={editData.open}
				onOpenChange={(open) => handleObjectState("open", open, setEditData)}
			/>
			<DeleteData
				onOpenChange={(open) => handleObjectState("open", open, setDeleteData)}
				isOpen={deleteData.open}
				deleteAction={() =>
					deleteLapangan(
						(
							responseData.find(
								(data) => data.id === deleteData.id
							) as LapanganResponseInterface
						).id
					)
				}
				mutationKey="deleteLapangan"
				invalidateKey="getLapangan"
			/>
		</>
	)
}

export default LapanganData

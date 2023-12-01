"use client"

import { useEffect, useState } from "react"
import Table from "../../Table"
import AddSesiLapangan from "./AddSesiLapangan"
import EditSesiLapangan from "./EditSesiLapangan"
import handleObjectState from "@/utils/handleObjectState"
import DeleteData from "../../DeleteData"
import { deleteSesiLapangan, getSesiLapangan } from "@/lib/http"
import { useQuery } from "@tanstack/react-query"
import { SesiLapanganResponseInterface } from "@/types/SesiLapanganInterface"
import { useToast } from "@/components/ui/use-toast"

const header = ["no", "jam mulai", "jam berakhir"]

const SesiLapanganData = () => {
	const { toast } = useToast()

	const {
		data: dataSesiLapangan,
		isPending,
		isRefetching,
		isError,
		error,
	} = useQuery({
		refetchOnWindowFocus: false,
		queryKey: ["getSesiLapangan"],
		queryFn: () => getSesiLapangan(),
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
		(dataSesiLapangan?.data.sesi as SesiLapanganResponseInterface[]) ?? []

	const tableData = responseData.map((data, index) => {
		return {
			id: data.id,
			fields: {
				no: index + 1,
				jam_mulai: data.jam_mulai,
				jam_berakhir: data.jam_berakhir,
			},
		}
	})

	const [addDataOpen, setAddDataOpen] = useState(false)
	const [editData, setEditData] = useState<{
		open: boolean
		currentData: SesiLapanganResponseInterface
	}>({
		open: false,
		currentData: {
			id: "",
			jam_berakhir: "",
			jam_mulai: "",
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
			) as SesiLapanganResponseInterface,
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
			<Table
				header={header}
				onDelete={(id) => handleDelete(id)}
				onEdit={(id) => handleEdit(id)}
				onAdd={() => setAddDataOpen(true)}
				tableData={tableData}
				isLoading={isPending || isRefetching}
			/>
			<AddSesiLapangan
				isOpen={addDataOpen}
				onOpenChange={(open) => setAddDataOpen(open)}
			/>
			<EditSesiLapangan
				currentData={editData.currentData}
				isOpen={editData.open}
				onOpenChange={(open) => handleObjectState("open", open, setEditData)}
			/>
			<DeleteData
				onOpenChange={(open) => handleObjectState("open", open, setDeleteData)}
				isOpen={deleteData.open}
				deleteAction={() =>
					deleteSesiLapangan(
						(
							responseData.find(
								(data) => data.id === deleteData.id
							) as SesiLapanganResponseInterface
						).id
					)
				}
				mutationKey="deleteSesiLapangan"
				invalidateKey="getSesiLapangan"
			/>
		</>
	)
}

export default SesiLapanganData

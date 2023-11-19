"use client"

import { useState } from "react"
import Table from "../../Table"
import AddSesiLapangan from "./AddSesiLapangan"
import EditSesiLapangan from "./EditSesiLapangan"
import handleObjectState from "@/utils/handleObjectState"

const header = ["no", "jam mulai", "jam berakhir"]

const tableData = [
	{
		no: 1,
		jam_mulai: "08:00",
		jam_berakhir: "09:00",
	},
	{
		no: 1,
		jam_mulai: "09:00",
		jam_berakhir: "10:00",
	},
	{
		no: 1,
		jam_mulai: "09:00",
		jam_berakhir: "10:00",
	},
	{
		no: 1,
		jam_mulai: "09:00",
		jam_berakhir: "10:00",
	},
	{
		no: 1,
		jam_mulai: "09:00",
		jam_berakhir: "10:00",
	},
	{
		no: 1,
		jam_mulai: "09:00",
		jam_berakhir: "10:00",
	},
	{
		no: 1,
		jam_mulai: "09:00",
		jam_berakhir: "10:00",
	},
	{
		no: 2,
		jam_mulai: "09:00",
		jam_berakhir: "10:00",
	},
	{
		no: 2,
		jam_mulai: "09:00",
		jam_berakhir: "10:00",
	},
	{
		no: 2,
		jam_mulai: "09:00",
		jam_berakhir: "10:00",
	},
	{
		no: 2,
		jam_mulai: "09:00",
		jam_berakhir: "10:00",
	},
	{
		no: 2,
		jam_mulai: "09:00",
		jam_berakhir: "10:00",
	},
	{
		no: 2,
		jam_mulai: "09:00",
		jam_berakhir: "10:00",
	},
	{
		no: 2,
		jam_mulai: "09:00",
		jam_berakhir: "10:00",
	},
	{
		no: 2,
		jam_mulai: "09:00",
		jam_berakhir: "10:00",
	},
]

const SesiLapanganData = () => {
	const [addDataOpen, setAddDataOpen] = useState(false)
	const [editData, setEditData] = useState({
		open: false,
		currentData: {
			jam_berakhir: "",
			jam_mulai: "",
		},
	})
	const [deleteData, setDeleteData] = useState({
		open: false,
		index: 0,
	})

	const handleEdit = (index: number) => {
		setEditData({
			open: true,
			currentData: {
				jam_mulai: tableData[index].jam_mulai,
				jam_berakhir: tableData[index].jam_berakhir,
			},
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
				onDelete={() => {}}
				onEdit={(index) => handleEdit(index)}
				onAdd={() => setAddDataOpen(true)}
				tableData={tableData}
				isLoading={true}
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
		</>
	)
}

export default SesiLapanganData

"use client"

import { useToast } from "@/components/ui/use-toast"
import DeleteData from "../DeleteData"
import Table from "../Table"
import { useQuery } from "@tanstack/react-query"
import { deleteBooking, getBooking } from "@/lib/http"
import { BookingResponseInterface } from "@/types/BookingInterface"
import { useEffect, useState } from "react"
import handleObjectState from "@/utils/handleObjectState"
import AddBooking from "./AddBooking"
import EditBooking from "./EditBooking"
import formatDate from "@/utils/formatDate"
import formatCurrency from "@/utils/formatCurrency"

const header = [
	"id",
	"atas nama",
	"jenis lapangan",
	"jam mulai",
	"jam berakhir",
	"harga",
	"status transaksi",
	"tipe pembayaran",
	"tgl_transaksi",
	"tgl_booking",
]

const BookingData = () => {
	const { toast } = useToast()

	const {
		data: dataBooking,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["getBooking"],
		queryFn: () => getBooking(),
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
		(dataBooking?.data.booking as BookingResponseInterface[]) ?? []

	const tableData = responseData.map((data) => {
		return {
			id: data.id,
			fields: {
				id: data.id,
				name: data.name,
				jenis_lapangan: data.jenis_lapangan,
				jam_mulai: data.jam_mulai,
				jam_berakhir: data.jam_berakhir,
				harga: `Rp. ${formatCurrency(data.harga)}`,
				status: data.status,
				payment_type: data.payment_type,
				transaction_time: data.transaction_time
					? formatDate(new Date(data.transaction_time), true)
					: "",
				tanggal: formatDate(new Date(data.tanggal), true),
			},
		}
	})
	const [addDataOpen, setAddDataOpen] = useState(false)
	const [editData, setEditData] = useState<{
		open: boolean
		currentData: BookingResponseInterface
	}>({
		open: false,
		currentData: {
			id: "",
			name: "",
			jenis_lapangan: "",
			jam_mulai: "",
			jam_berakhir: "",
			id_lapangan: "",
			harga: 0,
			status: "pending",
			payment_type: "",
			createdAt: formatDate(new Date()),
			updatedAt: formatDate(new Date()),
			tanggal: formatDate(new Date()),
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
			) as BookingResponseInterface,
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
				isLoading={isPending}
			/>
			<AddBooking
				isOpen={addDataOpen}
				onOpenChange={(open) => setAddDataOpen(open)}
			/>
			<EditBooking
				currentData={editData.currentData}
				isOpen={editData.open}
				onOpenChange={(open) => handleObjectState("open", open, setEditData)}
			/>
			<DeleteData
				onOpenChange={(open) => handleObjectState("open", open, setDeleteData)}
				isOpen={deleteData.open}
				deleteAction={() =>
					deleteBooking(
						(
							responseData.find(
								(data) => data.id === deleteData.id
							) as BookingResponseInterface
						).id
					)
				}
				mutationKey="deleteBooking"
				invalidateKey={["getBooking", "getLapangan"]}
			/>
		</>
	)
}

export default BookingData

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "../ui/use-toast"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface DeleteDataPropsInterface {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	deleteAction: () => Promise<any>
	mutationKey: string
	invalidateKey: string | string[]
}

const DeleteData = ({
	isOpen,
	onOpenChange,
	deleteAction,
	mutationKey,
	invalidateKey,
}: DeleteDataPropsInterface) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const { mutateAsync, data, isPending, isError, error, isIdle } = useMutation({
		mutationKey: [mutationKey],
		mutationFn: deleteAction,
		onSuccess: () => {
			if (typeof invalidateKey === "string") {
				queryClient.invalidateQueries({ queryKey: [invalidateKey] })
			} else {
				invalidateKey.map((data) => {
					queryClient.invalidateQueries({ queryKey: [data] })
				})
			}
		},
	})

	useEffect(() => {
		if (!isPending && !isIdle) {
			if (isError) {
				toast({
					title: "Terjadi Kesalahan",
					description: error?.message ?? "",
					variant: "destructive",
				})
			} else {
				toast({
					title: "Sukses",
					description: data.message,
				})
			}
		}
	}, [isPending, isError, isIdle])

	const handleDelete = async () => {
		await mutateAsync()
		onOpenChange(false)
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={(open) => onOpenChange(open)}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Anda Yakin Untuk Menghapus Data Ini?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Aksi ini tidak dapat dibatalkan, data akan dihapus secara permanen
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isPending}>Batal</AlertDialogCancel>
					<Button
						disabled={isPending}
						onClick={() => handleDelete()}
						variant="destructive"
						className="flex flex-row gap-x-2 justify-center items-center"
					>
						{isPending ? (
							<Loader2 className="h-5 w-5 animate-spin text-white" />
						) : null}
						<p>Hapus</p>
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default DeleteData

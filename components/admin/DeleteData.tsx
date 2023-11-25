import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "../ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "../ui/use-toast"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface DeleteDataPropsInterface {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	deleteAction: () => Promise<any>
	mutationKey: string
	invalidateKey: string
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

	const { mutate, data, isPending, isError, error, isIdle } = useMutation({
		mutationKey: [mutationKey],
		mutationFn: deleteAction,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [invalidateKey] }),
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
					<AlertDialogCancel>Batal</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => mutate()}
						className={buttonVariants({ variant: "destructive" })}
					>
						Hapus
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default DeleteData

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import React from "react"

interface LoginAlertPropsInterface {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const LoginAlert = ({ isOpen, onOpenChange }: LoginAlertPropsInterface) => {
	return (
		<AlertDialog open={isOpen} onOpenChange={(open) => onOpenChange(open)}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Anda Harus Login</AlertDialogTitle>
					<AlertDialogDescription>
						Login terlebih dahulu untuk melakukan booking lapangan
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Batal</AlertDialogCancel>
					<Button
						onClick={() => window.location.replace("/login")}
						className="flex flex-row gap-x-2 justify-center items-center"
					>
						<p>Login</p>
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default LoginAlert

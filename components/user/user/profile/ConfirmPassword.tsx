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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ConfirmPasswordPropsInterface {
	setConfirmPassword: (password: string | undefined) => void
	confirmPassword?: string
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const ConfirmPassword = ({
	setConfirmPassword,
	confirmPassword,
	isOpen,
	onOpenChange,
}: ConfirmPasswordPropsInterface) => {
	return (
		<AlertDialog open={isOpen} onOpenChange={(open) => onOpenChange(open)}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Anda Yakin Untuk Mengubah Password
					</AlertDialogTitle>
					<AlertDialogDescription>
						Masukan Password Sebelumnya untuk dapat mengubah password
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="flex flex-col gap-y-2 py-2">
					<Label htmlFor="password">Password Lama</Label>
					<Input
						onChange={(e) =>
							setConfirmPassword(
								e.target.value
							)
						}
						value={confirmPassword}
						id="password"
						type="password"
						autoComplete="off"
						placeholder="Masukkan Password Lama"
					/>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel>Batal</AlertDialogCancel>
					<Button onClick={() => onOpenChange(false)}>Lanjutkan</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default ConfirmPassword

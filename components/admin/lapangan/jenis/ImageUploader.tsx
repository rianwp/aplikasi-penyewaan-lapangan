import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

const ImageUploader = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant="outline">Upload Foto</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload Foto</DialogTitle>
					<DialogDescription>Upload Foto untuk Lapangan</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button
						// disabled={isPending}
						// onClick={() => mutate(inputForm)}
						className="bg-system-button-primary hover:bg-system-button-primary_hover flex flex-row gap-x-2"
						type="button"
					>
						{/* {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        ) : null} */}
						<p>Pilih Foto</p>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ImageUploader

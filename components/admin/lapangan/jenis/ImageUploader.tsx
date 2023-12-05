import { Button, buttonVariants } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
	deleteImageLapangan,
	getImageLapangan,
	uploadImageLapangan,
} from "@/lib/http"
import { ImageLapanganResponseInterface } from "@/types/ImageLapanganInterface"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"
import { BsX } from "react-icons/bs"

interface ImageUploaderPropsInterface {
	onAddImage: (images: ImageLapanganResponseInterface[]) => void
	selectedId: string[]
}

const ImageUploader = ({
	onAddImage,
	selectedId,
}: ImageUploaderPropsInterface) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()
	const [selectedImages, setSelectedImages] = useState<
		ImageLapanganResponseInterface[]
	>([])
	const [isLoading, setIsLoading] = useState(true)
	const [open, setOpen] = useState(false)

	const {
		data: dataImages,
		isPending: isDataImagesPending,
		isError: isDataImagesError,
		error: dataImagesError,
	} = useQuery({
		queryKey: ["getImageLapangan"],
		queryFn: () => getImageLapangan(),
	})

	const {
		mutate: mutateDeleteImage,
		data: dataDeleteImage,
		isPending: isDeleteImagePending,
		isError: isDeleteImageError,
		error: deleteImageError,
		isIdle: isDeleteImageIdle,
	} = useMutation({
		mutationKey: ["deleteImageLapangan"],
		mutationFn: (data: string) => deleteImageLapangan(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["getImageLapangan"],
			})
			queryClient.invalidateQueries({
				queryKey: ["getJenisLapangan"],
			})
		},
	})

	const {
		mutate: mutateUploadImage,
		isPending: isUploadImagePending,
		isError: isUploadImageError,
		error: uploadImageError,
		isIdle: isUploadImageIdle,
	} = useMutation({
		mutationKey: ["uploadImageLapangan"],
		mutationFn: (data: Blob) => uploadImageLapangan(data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["getImageLapangan"] }),
	})

	const responseData =
		(dataImages?.data.image as ImageLapanganResponseInterface[]) ?? []

	useEffect(() => {
		const initialSelectedImages = responseData.filter((data) =>
			selectedId.includes(data.id)
		)
		setSelectedImages(initialSelectedImages)
		setIsLoading(false)
	}, [selectedId])

	useEffect(() => {
		if (!isDataImagesPending) {
			if (isDataImagesError) {
				toast({
					title: "Terjadi Kesalahan",
					description: dataImagesError.message,
					variant: "destructive",
				})
			}
		}
	}, [isDataImagesPending, isDataImagesError])

	useEffect(() => {
		if (!isUploadImagePending && !isUploadImageIdle) {
			if (isUploadImageError) {
				toast({
					title: "Terjadi Kesalahan",
					description: uploadImageError.message,
					variant: "destructive",
				})
			}
		}
	}, [isUploadImagePending, isUploadImageError])

	useEffect(() => {
		if (!isDeleteImagePending && !isDeleteImageIdle) {
			if (isDeleteImageError) {
				toast({
					title: "Terjadi Kesalahan",
					description: deleteImageError.message,
					variant: "destructive",
				})
			} else {
				toast({
					title: "Sukses",
					description: dataDeleteImage.message,
				})
			}
		}
	}, [isDeleteImagePending, isDeleteImageError])

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files as FileList
		const image = files[0]
		mutateUploadImage(image)
	}

	const handleImageSelect = (image: ImageLapanganResponseInterface) => {
		if (!selectedImages.includes(image)) {
			const imagesAfterAdd = [...selectedImages, image]
			setSelectedImages(imagesAfterAdd)
		}
	}

	const handleImageUnselect = (id: string) => {
		const imagesAfterUnselect = selectedImages.filter((data) => data.id !== id)
		setSelectedImages(imagesAfterUnselect)
	}

	const handleImageDelete = (id: string) => {
		const imagesAfterDelete = selectedImages.filter((data) => data.id !== id)
		setSelectedImages(imagesAfterDelete)
		mutateDeleteImage(id)
	}

	const checkIsSelected = (id: string) => {
		return selectedImages.some((data) => {
			return data.id === id
		})
	}

	const handleSave = (open: boolean) => {
		onAddImage(selectedImages)
		setOpen(open)
	}

	return (
		<Dialog open={open && !isLoading} onOpenChange={(open) => handleSave(open)}>
			<Button onClick={() => setOpen(true)} variant="outline">
				{selectedId.length > 0 ? "Ubah Foto" : "Upload Foto"}
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload Foto</DialogTitle>
					<DialogDescription>Upload Foto untuk Lapangan</DialogDescription>
				</DialogHeader>
				<div className="rounded-lg border border-slate bg-primary-foreground">
					<div className="flex flex-row flex-wrap">
						{responseData.map((data) => {
							return (
								<div className="p-2" key={data.id}>
									<div className="relative w-24 h-24">
										<button
											disabled={isDeleteImagePending}
											onClick={() => handleImageDelete(data.id)}
											className="w-4 h-4 absolute z-20 -right-1 -top-1 text-white bg-system-danger hover:bg-red-800 rounded-full transition duration-300"
										>
											<BsX className="w-full h-full" />
										</button>
										{checkIsSelected(data.id) ? (
											<button
												className="absolute z-10 w-full h-full bg-black/40 flex items-center justify-center text-white"
												onClick={() => handleImageUnselect(data.id)}
											>
												Dipilih
											</button>
										) : (
											<button
												className="absolute z-10 w-full h-full bg-black/0 hover:bg-black/40 transition duration-300 flex items-center justify-center text-white/0 hover:text-white"
												onClick={() => handleImageSelect(data)}
											>
												Pilih
											</button>
										)}
										<img
											className="aspect-square object-cover w-full h-full"
											src={data.imageUrl}
										/>
									</div>
								</div>
							)
						})}
					</div>
					<div className="p-2 flex flex-row gap-x-2 items-center">
						<Input
							className="w-fit"
							type="file"
							disabled={
								isDeleteImagePending ||
								isUploadImagePending ||
								isDataImagesPending
							}
							onChange={(e) => handleImageChange(e)}
						/>
						{isUploadImagePending ||
						isDeleteImagePending ||
						isDataImagesPending ? (
							<Loader2 className="h-6 w-6 animate-spin text-white" />
						) : null}
					</div>
				</div>
				<DialogFooter>
					<Button
						disabled={
							isDataImagesPending ||
							isDeleteImagePending ||
							isUploadImagePending
						}
						onClick={() => handleSave(false)}
						className="bg-system-button-primary hover:bg-system-button-primary_hover flex flex-row gap-x-2"
						type="button"
					>
						{isDataImagesPending ||
						isDeleteImagePending ||
						isUploadImagePending ? (
							<Loader2 className="h-5 w-5 animate-spin text-white" />
						) : null}
						<p>Simpan</p>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ImageUploader

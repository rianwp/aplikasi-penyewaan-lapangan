import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { ImageLapanganResponseInterface } from "@/types/ImageLapanganInterface"

interface ImageListPropsInterface {
	images: ImageLapanganResponseInterface[]
}

const ImageList = ({ images }: ImageListPropsInterface) => {
	return (
		<Popover>
			<PopoverTrigger>Lihat Foto</PopoverTrigger>
			<PopoverContent className="flex flex-row overflow-x-auto">
				{images.length === 0 ? <p className="text-sm">Tidak Ada Data</p> : null}
				{images.map((data) => {
					return (
						<div className="p-2" key={data.id}>
							<div className="relative w-24 h-24">
								<img
									className="aspect-square object-cover w-full h-full"
									src={data.imageUrl}
								/>
							</div>
						</div>
					)
				})}
			</PopoverContent>
		</Popover>
	)
}

export default ImageList

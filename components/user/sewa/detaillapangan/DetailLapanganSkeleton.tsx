import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/shadcnUtils"
import { Loader2 } from "lucide-react"

const DetailLapanganSkeleton = () => {
	return (
		<>
			<div className="lg:w-3/5 w-full py-4 flex flex-col gap-y-2 lg:pr-4 pr-0">
				<Skeleton className="w-full aspect-video rounded-lg overflow-hidden" />
				<ScrollArea>
					<div className="w-max flex flex-row gap-x-2">
						{[...Array(5)].map((data, index) => {
							return (
								<button
									className="hover:scale-95 transition duration-300 shrink-0 rounded-lg overflow-hidden "
									key={index}
								>
									<Skeleton className={cn(["sm:h-28 h-16 aspect-video"])} />
								</button>
							)
						})}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
				<Skeleton className="h-6 w-20 my-1" />
				<Skeleton className="h-4 my-1 w-16" />
				<Separator />
				<div className="flex flex-col gap-x-1">
					<Skeleton className="h-4 my-1 w-16" />
					<div>
						<Skeleton className="h-4 my-1 w-full" />
						<Skeleton className="h-4 my-1 w-full" />
						<Skeleton className="h-4 my-1 w-full" />
					</div>
				</div>
			</div>
			<div className="lg:w-2/5 w-full py-4 lg:pl-4 pl-0">
				<div className="lg:rounded-lg lg:border lg:p-4 py-4 flex flex-col gap-y-2">
					<Skeleton className="h-6 w-full my-1 mb-2 lg:block hidden" />
					<Skeleton className="lg:w-full w-20 h-6 self-end lg:mb-8" />
					<div className="flex flex-row items-center gap-x-0.5">
						<Skeleton className="h-6 w-48" />
					</div>
					<Button
						disabled
						className="lg:w-full w-full bg-client-primary hover:bg-red-800 flex flex-row gap-x-2"
					>
						<Loader2 className="h-5 w-5 animate-spin text-white" />
						Pesan
					</Button>
				</div>
			</div>
		</>
	)
}

export default DetailLapanganSkeleton

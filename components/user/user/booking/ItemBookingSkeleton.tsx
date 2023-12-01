import { Skeleton } from "@/components/ui/skeleton"

const ItemBookingSkeleton = () => {
	return (
		<div className="w-full p-4 rounded-lg border flex flex-col gap-y-4 bg-white">
			<div className="flex fex-row justify-between">
				<div className="flex flex-row gap-x-2 items-center">
					<Skeleton className="h-3.5 w-10 my-1.5" />
					<Skeleton className="h-3.5 w-32 my-1.5" />
				</div>
				<Skeleton className="h-3.5 w-32 my-1.5" />
			</div>
			<div className="pt-2 border-t">
				<Skeleton className="h-3 my-0.5 w-20" />
			</div>
			<div className="flex flex-row">
				<div className="flex flex-col gap-y-1 border-r pr-4 items-center justify-center">
					<Skeleton className="h-3.5 w-12 my-1.5" />
					<p>-</p>
					<Skeleton className="h-3.5 w-12 my-1.5" />
				</div>
				<div className="flex flex-col gap-y-2 pl-4">
					<Skeleton className="my-3.5 h-4 w-32" />
					<Skeleton className="h-3.5 w-20 my-1.5" />
				</div>
			</div>
		</div>
	)
}

export default ItemBookingSkeleton

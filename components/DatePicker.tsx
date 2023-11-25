import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/shadcnUtils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerPropsInterface {
	date: Date | undefined
	onDateChange: React.Dispatch<React.SetStateAction<Date | undefined>>
	className?: string
	htmlId: string
}

const DatePicker = ({
	date,
	onDateChange,
	className,
	htmlId,
}: DatePickerPropsInterface) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					id={htmlId}
					variant={"outline"}
					className={cn(
						"max-w-full justify-start text-left font-normal",
						!date && "text-muted-foreground",
						className
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					required={true}
					fromDate={new Date()}
					onSelect={onDateChange}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}

export default DatePicker

export interface DashboardHeaderInterface {
	title: string
	value: any
}

export interface WeeklyTransactionInterface {
	sun: number
	mon: number
	tue: number
	wed: number
	thu: number
	fri: number
	sat: number
}

export interface DashboardWeeklyChartInterface {
	weeklyTransaction: WeeklyTransactionInterface
	startAt: string
	endAt: string
}

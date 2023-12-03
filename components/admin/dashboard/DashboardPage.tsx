import Breadcrumb from "../Breadcrumb"
import TransactionWeeklyChart from "./TransactionWeeklyChart"

const DashboardPage = () => {
	return (
		<>
			<h1 className="font-semibold text-4xl text-system-text-primary mb-5">
				Dashboard
			</h1>
			<Breadcrumb name="Dashboard" />
			<TransactionWeeklyChart />
		</>
	)
}

export default DashboardPage

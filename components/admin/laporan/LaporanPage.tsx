import Breadcrumb from "../Breadcrumb"
import LaporanBooking from "./LaporanBooking"

const LaporanPage = () => {
	return (
		<>
			<h1 className="font-semibold text-4xl text-system-text-primary mb-5">
				Laporan
			</h1>
			<Breadcrumb name="Laporan" />
			<LaporanBooking />
		</>
	)
}

export default LaporanPage

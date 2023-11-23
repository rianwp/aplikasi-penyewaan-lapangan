import Breadcrumb from "../../Breadcrumb"
import LapanganData from "./LapanganData"

const LapanganPage = () => {
	return (
		<>
			<h1 className="font-semibold text-4xl text-system-text-primary mb-5">
				Lapangan
			</h1>
			<Breadcrumb name="Lapangan" />
			<LapanganData />
		</>
	)
}

export default LapanganPage

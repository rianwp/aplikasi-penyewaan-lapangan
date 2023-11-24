import Breadcrumb from "../Breadcrumb"
import KetersediaanLapanganData from "./KetersediaanLapanganData"

const KetersediaanLapanganPage = () => {
	return (
		<>
			<h1 className="font-semibold text-4xl text-system-text-primary mb-5">
				Ketersediaan Lapangan
			</h1>
			<Breadcrumb name="Lapangan" />
			<KetersediaanLapanganData/>
		</>
	)
}

export default KetersediaanLapanganPage

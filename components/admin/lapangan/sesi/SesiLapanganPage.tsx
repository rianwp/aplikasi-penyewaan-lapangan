import Breadcrumb from "../../Breadcrumb"
import SesiLapanganData from "./SesiLapanganData"

const SesiLapanganPage = () => {
	return (
		<>
			<h1 className="font-semibold text-4xl text-system-text-primary mb-5">
				Sesi Lapangan
			</h1>
			<Breadcrumb name="Sesi Lapangan" />
			<SesiLapanganData />
		</>
	)
}

export default SesiLapanganPage

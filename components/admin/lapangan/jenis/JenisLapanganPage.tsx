import Breadcrumb from "../../Breadcrumb"
import JenisLapanganData from "./JenisLapanganData"

const JenisLapanganPage = () => {
	return (
		<>
			<h1 className="font-semibold text-4xl text-system-text-primary mb-5">
				Jenis Lapangan
			</h1>
			<Breadcrumb name="Jenis Lapangan" />
			<JenisLapanganData />
		</>
	)
}

export default JenisLapanganPage

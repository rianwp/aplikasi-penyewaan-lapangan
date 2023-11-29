import DetailLapanganPage from "@/components/user/sewa/detaillapangan/DetailLapanganPage"
import { IdParamsInterface } from "@/types/IdParamsInterface"

const Page = ({ params }: IdParamsInterface) => {
	return <DetailLapanganPage id={params.id} />
}

export default Page

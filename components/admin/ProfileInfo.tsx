import { Separator } from "../ui/separator"

interface ProfileInfoPropsInterface {
	name: string
	email: string
}

const ProfileInfo = ({ name, email }: ProfileInfoPropsInterface) => {
	return (
		<>
			<div className="flex flex-col items-start px-2 py-1.5">
				<div className="flex flex-row space-x-1 line-clamp-1">
					<p className="font-medium text-sm">{name}</p>
				</div>
				<p className="font-normal text-sm line-clamp-1">{email}</p>
			</div>
			<Separator />
		</>
	)
}

export default ProfileInfo

import UserProfileForm from "./UserProfileForm"

const UserProfilePage = () => {
	return (
		<div className="flex flex-col gap-y-4 px-2">
			<h1 className="font-semibold text-lg">Profile</h1>
			<UserProfileForm />
		</div>
	)
}

export default UserProfilePage

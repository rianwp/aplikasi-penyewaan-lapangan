"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { editUser, getUserData } from "@/lib/http"
import {
	UserEditRequestInterface,
	UserResponseInterface,
} from "@/types/UserInterface"
import handleNegativeNumber from "@/utils/handleNegativeNumber"
import handleObjectState from "@/utils/handleObjectState"
import shallowEqual from "@/utils/shallowEqual"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import ConfirmPassword from "./ConfirmPassword"
import { useToast } from "@/components/ui/use-toast"

const UserProfileForm = () => {
	const { toast } = useToast()
	const queryClient = useQueryClient()

	const {
		data: userData,
		isPending: isUserDataPending,
		isError: isUserDataError,
		error: userDataError,
	} = useQuery({
		queryKey: ["userData"],
		refetchOnWindowFocus: false,
		retry: 2,
		queryFn: () => getUserData(),
	})

	const {
		mutate,
		data: dataEditUser,
		isPending: isDataEditUserPending,
		isError: isDataEditUserError,
		error: dataEditUserError,
		isIdle: isDataEditUserIdle,
	} = useMutation({
		mutationKey: ["editUser"],
		mutationFn: (data: UserEditRequestInterface) => editUser(data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userData"] }),
	})

	useEffect(() => {
		if (!isUserDataPending) {
			if (isUserDataError) {
				toast({
					title: "Terjadi Kesalahan",
					description: userDataError?.message ?? "",
					variant: "destructive",
				})
			}
		}
	}, [isUserDataPending, isUserDataPending])

	useEffect(() => {
		if (!isDataEditUserPending && !isDataEditUserIdle) {
			if (isDataEditUserError) {
				toast({
					title: "Terjadi Kesalahan",
					description: dataEditUserError?.message ?? "",
					variant: "destructive",
				})
			} else {
				toast({
					title: "Sukses",
					description: dataEditUser.message,
				})
			}
		}
	}, [isDataEditUserPending, isDataEditUserError, isDataEditUserIdle])

	const [inputForm, setInputForm] = useState<UserEditRequestInterface>({
		email: "",
		name: "",
		no_telp: "",
		new_password: "",
		password: "",
	})

	const responseData = userData?.data.user as UserResponseInterface

	const [openConfirmPassword, setOpenConfirmPassword] = useState(false)
	const [isValueChanged, setIsValueChanged] = useState(false)

	useEffect(() => {
		if (!isUserDataPending && !isUserDataError) {
			const currentData = {
				email: responseData.email,
				name: responseData.name,
				no_telp: responseData.no_telp,
				new_password: "",
				password: "",
			}
			if (shallowEqual(currentData, inputForm)) {
				setIsValueChanged(false)
			} else {
				setIsValueChanged(true)
			}
		}
	}, [inputForm, isUserDataPending, isUserDataError])

	useEffect(() => {
		if (!isUserDataPending && !isUserDataError) {
			const currentData = {
				email: responseData.email,
				name: responseData.name,
				no_telp: responseData.no_telp,
				new_password: "",
				password: "",
			}
			setInputForm(currentData)
		}
	}, [isUserDataPending, isUserDataError])

	const handleSave = () => {
		if (inputForm.new_password !== "" && inputForm.password === "") {
			setOpenConfirmPassword(true)
			return
		}
		mutate({
			...inputForm,
			password: inputForm.password === "" ? undefined : inputForm.password,
			new_password:
				inputForm.new_password === "" ? undefined : inputForm.new_password,
		})
		setInputForm({
			...inputForm,
			password: "",
			new_password: "",
		})
	}

	return (
		<>
			<div className="flex flex-col gap-y-4">
				<div className="flex flex-col gap-y-2">
					<Label htmlFor="name">Nama</Label>
					<Input
						onChange={(e) =>
							handleObjectState("name", e.target.value, setInputForm)
						}
						value={inputForm.name}
						id="name"
						disabled={isDataEditUserPending || isUserDataPending}
						type="text"
						autoComplete="off"
						placeholder="Edit Nama"
					/>
				</div>
				<div className="flex flex-col gap-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						onChange={(e) =>
							handleObjectState("email", e.target.value, setInputForm)
						}
						value={inputForm.email}
						id="email"
						disabled={isDataEditUserPending || isUserDataPending}
						type="email"
						autoComplete="off"
						placeholder="Edit Email"
					/>
				</div>
				<div className="flex flex-col gap-y-2">
					<Label htmlFor="no_telp">No Telepon</Label>
					<Input
						onChange={(e) =>
							handleObjectState("no_telp", e.target.value, setInputForm)
						}
						value={inputForm.no_telp}
						id="no_telp"
						disabled={isDataEditUserPending || isUserDataPending}
						type="number"
						autoComplete="off"
						placeholder="Edit No Telepon (ex: 081365237823)"
					/>
				</div>
				<div className="flex flex-col gap-y-2">
					<Label htmlFor="new_password">Password</Label>
					<Input
						onChange={(e) =>
							handleObjectState("new_password", e.target.value, setInputForm)
						}
						value={inputForm.new_password}
						id="new_password"
						disabled={isDataEditUserPending || isUserDataPending}
						type="password"
						autoComplete="off"
						placeholder="Edit Password"
					/>
				</div>
			</div>
			<Button
				disabled={isDataEditUserPending || !isValueChanged || isUserDataPending}
				size="lg"
				className="flex flex-row gap-x-2 justify-center items-center bg-client-primary hover:bg-red-800 md:self-end self-center md:w-auto w-full"
				onClick={() => handleSave()}
			>
				{isDataEditUserPending ? (
					<Loader2 className="h-5 w-5 animate-spin text-white" />
				) : null}
				<p>Simpan Perubahan</p>
			</Button>
			{openConfirmPassword ? (
				<ConfirmPassword
					isOpen={openConfirmPassword}
					onOpenChange={setOpenConfirmPassword}
					setConfirmPassword={(password) =>
						handleObjectState("password", password, setInputForm)
					}
					confirmPassword={inputForm.password}
				/>
			) : null}
		</>
	)
}

export default UserProfileForm

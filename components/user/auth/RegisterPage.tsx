"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { loginUser, registerUser } from "@/lib/http"
import { LoginInterface } from "@/types/LoginInterface"
import handleObjectState from "@/utils/handleObjectState"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

const RegisterPage = () => {
	const { toast } = useToast()
	const { mutate, isPending, isError, error, isIdle } = useMutation({
		mutationKey: ["login"],
		mutationFn: (data: RegisterInterface) => registerUser(data),
	})

	const [formInput, setFormInput] = useState<RegisterInterface>({
		email: "",
		password: "",
		confirm_password: "",
		name: "",
		no_telp: "",
	})

	useEffect(() => {
		if (!isPending && !isIdle) {
			if (isError) {
				toast({
					title: "Register Gagal",
					description: error?.message ?? "",
					variant: "destructive",
				})
			} else {
				window.location.replace("/")
			}
		}
	}, [isPending, isError, isIdle])

	return (
		<div className="bg-white border rounded-lg flex flex-col gap-y-4 p-8">
			<h1 className="font-bold text-2xl text-center">Register</h1>
			<div className="flex flex-col gap-y-1">
				<Label htmlFor="name">Nama</Label>
				<Input
					onChange={(e) =>
						handleObjectState("name", e.target.value, setFormInput)
					}
					id="name"
					type="text"
					autoComplete="off"
					placeholder="Masukkan Nama"
				/>
			</div>
			<div className="flex flex-col gap-y-1">
				<Label htmlFor="no_telp">No Telepon</Label>
				<Input
					onChange={(e) =>
						handleObjectState("no_telp", e.target.value, setFormInput)
					}
					id="no_telp"
					type="number"
					autoComplete="off"
					placeholder="Masukkan Nomor Telepon"
				/>
			</div>
			<div className="flex flex-col gap-y-1">
				<Label htmlFor="email">Email</Label>
				<Input
					onChange={(e) =>
						handleObjectState("email", e.target.value, setFormInput)
					}
					id="email"
					type="email"
					autoComplete="off"
					placeholder="Masukkan Email"
				/>
			</div>
			<div className="flex flex-col gap-y-1">
				<Label htmlFor="password">Password</Label>
				<Input
					onChange={(e) =>
						handleObjectState("password", e.target.value, setFormInput)
					}
					id="password"
					type="password"
					placeholder="Masukkan Password"
				/>
			</div>
			<div className="flex flex-col gap-y-1">
				<Label htmlFor="confirm_password">Konfirmasi Password</Label>
				<Input
					onChange={(e) =>
						handleObjectState("confirm_password", e.target.value, setFormInput)
					}
					id="confirm_password"
					type="password"
					placeholder="Tulis Ulang Password"
				/>
			</div>
			<Button
				disabled={isPending}
				size="lg"
				className="flex flex-row gap-x-2 justify-center items-center bg-client-primary hover:bg-red-800 w-full"
				onClick={() => mutate(formInput)}
			>
				{isPending ? (
					<Loader2 className="h-5 w-5 animate-spin text-white" />
				) : null}
				<p>Register</p>
			</Button>
		</div>
	)
}

export default RegisterPage

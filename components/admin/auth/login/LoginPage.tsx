"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginAdmin } from "@/lib/http"
import { LoginInterface } from "@/types/LoginInterface"
import { useMutation } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import handleObjectState from "@/utils/handleObjectState"

const LoginPage = () => {
	const { toast } = useToast()
	const { mutate, isPending, isError, error, isIdle } = useMutation({
		mutationKey: ["login"],
		mutationFn: (data: LoginInterface) => loginAdmin(data),
	})

	const [inputForm, setInputForm] = useState<LoginInterface>({
		email: "",
		password: "",
	})

	useEffect(() => {
		if (!isPending && !isIdle) {
			if (isError) {
				toast({
					title: "Login Gagal",
					description: error?.message ?? "",
					variant: "destructive",
				})
			} else {
				window.location.replace("/admin/dashboard")
			}
		}
	}, [isPending, isError, isIdle])

	return (
		<div className="w-full h-screen flex justify-center items-center font-sans">
			<div className="bg-primary-foreground border rounded-lg flex flex-col gap-y-4 p-8">
				<h1 className="font-bold text-2xl text-center">Login</h1>
				<div className="flex flex-col gap-y-1">
					<Label htmlFor="email">Email</Label>
					<Input
						onChange={(e) =>
							handleObjectState("email", e.target.value, setInputForm)
						}
						id="email"
						type="email"
						value={inputForm.email}
						autoComplete="off"
						placeholder="Masukkan Email"
					/>
				</div>
				<div className="flex flex-col gap-y-1">
					<Label htmlFor="password">Password</Label>
					<Input
						onChange={(e) =>
							handleObjectState("password", e.target.value, setInputForm)
						}
						id="password"
						type="password"
						value={inputForm.password}
						autoComplete="off"
						placeholder="Masukkan Password"
					/>
				</div>
				<Button
					disabled={isPending}
					size="lg"
					className="flex flex-row gap-x-2 justify-center items-center w-full"
					onClick={() => mutate(inputForm)}
				>
					{isPending ? (
						<Loader2 className="h-5 w-5 animate-spin text-white" />
					) : null}
					<p>Login</p>
				</Button>
			</div>
		</div>
	)
}

export default LoginPage

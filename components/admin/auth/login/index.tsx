"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/lib/http"
import { LoginInterface } from "@/types/login"
import { useMutation } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

const LoginPage = () => {
	const { toast } = useToast()
	const { mutate, isPending, isError, error, isIdle } = useMutation({
		mutationKey: ["login"],
		mutationFn: (loginData: LoginInterface) => login(loginData),
	})

	const [loginInput, setLoginInput] = useState({
		email: "",
		password: "",
	})

	const handleLoginInput = (inputKey: string, newValue: string) => {
		setLoginInput((existingLoginInput) => {
			return {
				...existingLoginInput,
				[inputKey]: newValue,
			}
		})
	}

	useEffect(() => {
		if (!isPending && !isIdle) {
			if (isError) {
				toast({
					title: "Login Gagal",
					description: error.message,
					className: "bg-system-danger text-white",
				})
			} else {
				window.location.replace("/admin/dashboard")
			}
		}
	}, [isPending, isError, isIdle])

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="bg-primary-foreground border border-slate-200 rounded-lg flex flex-col gap-y-4 p-10">
				<h1 className="font-bold text-2xl text-center">Login</h1>
				<div className="flex flex-col gap-y-1">
					<Label htmlFor="email">Email</Label>
					<Input
						onChange={(e) => handleLoginInput("email", e.target.value)}
						id="email"
						type="email"
						placeholder="Masukan Email"
					/>
				</div>
				<div className="flex flex-col gap-y-1">
					<Label htmlFor="password">Password</Label>
					<Input
						onChange={(e) => handleLoginInput("password", e.target.value)}
						id="password"
						type="password"
						placeholder="Masukan Password"
					/>
				</div>
				<Button
					disabled={isPending}
					size="lg"
					className="flex flex-row space-x-2 justify-center items-center w-full"
					onClick={() => mutate(loginInput)}
				>
					{isPending ? (
						<Loader2 className="h-5 w-5 animate-spin text-gray-400" />
					) : null}
					<p>Login</p>
				</Button>
			</div>
		</div>
	)
}

export default LoginPage

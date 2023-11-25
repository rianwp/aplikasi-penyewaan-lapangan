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
		mutationFn: (loginData: LoginInterface) => loginAdmin(loginData),
	})

	const [loginInput, setLoginInput] = useState({
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
		<div className="w-full h-screen flex justify-center items-center">
			<div className="bg-primary-foreground border border-slate-200 rounded-lg flex flex-col gap-y-4 p-8">
				<h1 className="font-bold text-2xl text-center">Login</h1>
				<div className="flex flex-col gap-y-1">
					<Label htmlFor="email">Email</Label>
					<Input
						onChange={(e) =>
							handleObjectState("email", e.target.value, setLoginInput)
						}
						id="email"
						type="email"
						autoComplete="off"
						placeholder="Masukan Email"
					/>
				</div>
				<div className="flex flex-col gap-y-1">
					<Label htmlFor="password">Password</Label>
					<Input
						onChange={(e) =>
							handleObjectState("password", e.target.value, setLoginInput)
						}
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

import { $Enums } from "@prisma/client"

export interface UserEditRequestInterface {
	name: string
	email: string
	password?: string
	new_password?: string
	no_telp: string
}

export interface UserResponseInterface {
	id: string
	email: string
	role: $Enums.Role
	name: string
	no_telp: string
}

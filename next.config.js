/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["ik.imagekit.io"],
	},
	async rewrites() {
		return [
			{
				source: "/admin",
				destination: "/admin/dashboard",
			},
			{
				source: "/admin/login",
				destination: "/admin/auth/login",
			},
			{
				source: "/login",
				destination: "/auth/login",
			},
			{
				source: "/register",
				destination: "/auth/register",
			},
			{
				source: "/",
				destination: "/lapangan",
			},
		]
	},
}

module.exports = nextConfig

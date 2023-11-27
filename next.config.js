/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["ik.imagekit.io"],
	},
	async redirects() {
		return [
			{
				source: "/admin",
				destination: "/admin/dashboard",
				permanent: true,
			},
			{
				source: "/admin/login",
				destination: "/admin/auth/login",
				permanent: true,
			},
			{
				source: "/login",
				destination: "/auth/login",
				permanent: true,
			},
			{
				source: "/register",
				destination: "/auth/register",
				permanent: true,
			},
			{
				source: "/",
				destination: "/lapangan",
				permanent: true,
			},
		]
	},
}

module.exports = nextConfig

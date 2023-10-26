import ImageKit from "imagekit"

const imageKit = new ImageKit({
	publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
	urlEndpoint: process.env.IMAGEKIT_URL || "",
})

export default imageKit

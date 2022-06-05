module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com'],
	},
	env: {
		NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
		URL_API: process.env.URL_API,
		URL_CLOUDINARY_RES: process.env.URL_CLOUDINARY_RES,
		PRESET_HEADER_INFO: process.env.PRESET_HEADER_INFO,
	},
};

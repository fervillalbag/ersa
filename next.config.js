module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  env: {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    URL_ROOT_LOCAL: process.env.URL_ROOT_LOCAL,
    URL_CLOUDINARY_RES: process.env.URL_CLOUDINARY_RES,
    PRESET_HEADER_INFO: process.env.PRESET_HEADER_INFO,
    API_HEADER_REQ_DEV: process.env.API_HEADER_REQ_DEV
  }
}

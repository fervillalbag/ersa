module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  env: {
    URL_ROOT: process.env.URL_ROOT,
    URL_ROOT_LOCAL: process.env.URL_ROOT_LOCAL
  }
}

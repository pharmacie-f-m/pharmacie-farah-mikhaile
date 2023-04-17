module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/categories',
        destination: '/category/1',
        permanent: true,
      },
      {
        source : '/categories/alphabets',
        destination : '/category/1',
        permanent : true,
      }
    ]
  },
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
}

module.exports = {
    /* config options here */
    async redirects() {
        return [
          {
            source: '/',
            destination: '/secured/dashboard',
            permanent: true,
          },
        ]
      },
  }
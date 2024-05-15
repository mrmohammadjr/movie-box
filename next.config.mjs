/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    serverActions: true
  },
  reactStrictMode: true,
  images: { domains: ['moviesapi.ir',"image.tmdb.org"] },
};

export default nextConfig;

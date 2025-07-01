/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'footballplans.blob.core.windows.net',
      },
    ],
  },
};

export default nextConfig;

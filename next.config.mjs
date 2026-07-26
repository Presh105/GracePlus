/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spfmitqrcxyjirpdrnzn.supabase.co',
      },
    ],
  },
};

export default nextConfig;

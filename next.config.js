/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    disableStaticImages: true,
    domains: ['xfqdxmysyinpeegwdcsu.supabase.co'],
    unoptimized: true,
  },
};

module.exports = nextConfig;

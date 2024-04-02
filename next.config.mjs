/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", 
  basePath: "/json-schema-tour",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;

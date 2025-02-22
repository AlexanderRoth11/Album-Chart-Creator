/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.worker\.js$/,
      loader: "worker-loader",
      options: {},
    });

    return config;
  },
};

export default nextConfig;

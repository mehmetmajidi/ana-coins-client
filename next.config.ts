/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
import { Configuration as WebpackConfig } from "webpack";

const nextConfig = {
     reactStrictMode: true, // Keep strict mode enabled
     swcMinify: true,
     staticPageGenerationTimeout: 600,
     productionBrowserSourceMaps: true,
     i18n,
     images: {},
     webpack(config: WebpackConfig) {
          return config;
     },
     env: {
          SERVER_API: "7000/graphql",
          LOCAL_URL: "localhost",
     },
};

module.exports = nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: Don't use output: "standalone" with Amplify WEB_COMPUTE
  // Amplify handles bundling itself

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picklellama-content.s3.ca-central-1.amazonaws.com",
      },
    ],
  },

  // Prevent bundling issues with AWS SDK in Amplify
  serverExternalPackages: [
    "@aws-sdk/client-s3",
    "@aws-sdk/client-ses",
    "@aws-sdk/s3-request-presigner",
  ],

  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;

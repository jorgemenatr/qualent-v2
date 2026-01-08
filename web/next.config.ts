import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Next.js SSR on Amplify
  output: "standalone",

  // Embed server-side env vars at build time for Amplify SSR
  // Amplify doesn't pass env vars to Lambda runtime, only build time
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },

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

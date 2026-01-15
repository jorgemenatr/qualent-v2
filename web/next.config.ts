import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Next.js SSR on Amplify
  output: "standalone",

  // Embed server-side env vars at build time for Amplify SSR
  // Amplify doesn't pass env vars to Lambda runtime, only build time
  // Note: Can't use AWS_ prefix - reserved by Amplify
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    // S3 configuration (no AWS_ prefix due to Amplify restriction)
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_REGION: process.env.S3_REGION,
    // IAM Role for SSR functions to assume
    AMPLIFY_SERVICE_ROLE_ARN: process.env.AMPLIFY_SERVICE_ROLE_ARN,
    // Cognito (server-side)
    COGNITO_ISSUER: process.env.COGNITO_ISSUER,
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

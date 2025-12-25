import { withWorkflow } from "workflow/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude @workflow-worlds/redis from bundling to ensure it's available in serverless
  // This prevents Next.js from bundling the package and ensures it's available at runtime
  serverExternalPackages: ["@workflow-worlds/redis"],
  // Ensure the package and its dependencies are included in Vercel's output file tracing
  outputFileTracingIncludes: {
    "/api/**/*": [
      // Include the entire @workflow-worlds/redis package directory
      "./node_modules/@workflow-worlds/redis/**/*",
      // Include its dependencies that might not be auto-traced
      "./node_modules/@workflow/errors/**/*",
      "./node_modules/@workflow/world/**/*",
      "./node_modules/bullmq/**/*",
      "./node_modules/ioredis/**/*",
      "./node_modules/cbor-x/**/*",
      "./node_modules/ulid/**/*",
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark @workflow-worlds/redis as external to prevent bundling
      // This ensures it's loaded as an ES module at runtime
      const externals = config.externals || [];
      if (Array.isArray(externals)) {
        externals.push("@workflow-worlds/redis");
      } else {
        config.externals = [externals, "@workflow-worlds/redis"];
      }
    }
    return config;
  },
};
export default withWorkflow(nextConfig);

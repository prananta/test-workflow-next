import { withWorkflow } from "workflow/next";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Exclude @workflow-worlds/redis from bundling to ensure it's available in serverless
  // This prevents Next.js from bundling the package and ensures it's available at runtime
  serverExternalPackages: ["@workflow-worlds/redis"],
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

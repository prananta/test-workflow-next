import { withWorkflow } from "workflow/next";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Exclude @workflow-worlds/redis from bundling to ensure it's available in serverless
  // This prevents Next.js from bundling the package and ensures it's available at runtime
  serverExternalPackages: ["@workflow-worlds/redis"],
};
export default withWorkflow(nextConfig);

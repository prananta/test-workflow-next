import { withWorkflow } from "workflow/next";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // … rest of your Next.js config
  output: "standalone",
  outputFileTracingIncludes: {
    "/*": [
      "./node_modules/@workflow/world-postgres/**",
      "./node_modules/pg-boss/**",
      "./node_modules/postgres/**",
    ],
  },
};
export default withWorkflow(nextConfig);

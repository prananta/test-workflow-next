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
      "./node_modules/zod/**",
      "./node_modules/dotenv/**",
      "./node_modules/drizzle-orm/**",
      "./node_modules/ulid/**",
      "./node_modules/cbor-x/**",
      "./node_modules/@workflow/**",
      "./node_modules/@vercel/**",
    ],
  },
};
export default withWorkflow(nextConfig);

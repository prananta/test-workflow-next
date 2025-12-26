import { getWorld } from "@/workflows/world/postgres";

export async function register() {
  if (process.env.NEXT_RUNTIME !== "edge") {
    // Dynamic import to avoid edge runtime bundling issues
    console.log("Starting Postgres World...");
    await getWorld().start?.();
    console.log("Postgres World started");
  }
}

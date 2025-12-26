import { getWorld } from "@/workflows/world/postgres";

export async function register() {
  console.log("Starting Postgres World...");
  await getWorld().start?.();
  console.log("Postgres World started");
}

import { getWorld } from "./workflows/world/postgres";

export async function register() {
  await getWorld().start?.();
}

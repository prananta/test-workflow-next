// This route exists solely to ensure @workflow/world-postgres is included in standalone output
// It's never actually called, but Next.js will trace the import during build
import * as worldPostgres from "@workflow/world-postgres";
import { connection } from "next/server";

export async function POST() {
  // Reference the import to ensure it's not tree-shaken
  await connection();
  worldPostgres.createWorld();
  return new Response("OK", { status: 200 });
}

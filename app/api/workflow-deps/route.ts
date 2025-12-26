// This route exists solely to ensure @workflow/world-postgres is included in standalone output
// It's never actually called, but Next.js will trace the import during build
import { createWorld } from "@workflow/world-postgres";

// Force the import to be traced by referencing it in a way that can't be tree-shaken
// Using a type assertion to ensure the import is kept
const _unused = createWorld as typeof createWorld;

export async function GET() {
  // Reference the import to ensure it's not tree-shaken
  void _unused;
  return new Response("OK", { status: 200 });
}


export async function register() {
  if (process.env.NEXT_RUNTIME !== "edge") {
    // Dynamic import to avoid edge runtime bundling issues
    console.log("Starting Redis World...");
    const { getWorld } = await import("workflow/runtime");
    await getWorld().start?.();
    console.log("Redis World started");
  }
}

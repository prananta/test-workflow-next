export async function register() {
  if (process.env.NEXT_RUNTIME !== "edge") {
    // Dynamic import to avoid edge runtime bundling issues
    console.log("Starting Redis World...");
    const { createWorld } = await import("@workflow-worlds/redis");
    const { getWorld } = await import("workflow/runtime");
    let world = getWorld();
    if (!world) {
      // @ts-expect-error - createWorld is not typed
      world = createWorld();
    }
    await world.start?.();
    console.log("Redis World started");
  }
}

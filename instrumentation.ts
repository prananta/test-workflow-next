export async function register() {
  if (process.env.NEXT_RUNTIME !== "edge") {
    try {
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
    } catch (error) {
      // Log error but don't fail the server startup
      // This allows the app to work even if Redis World can't be initialized
      console.error("Failed to initialize Redis World:", error);
      // In production/serverless, we might want to continue without Redis World
      // or throw if it's critical for your use case
      if (process.env.NODE_ENV === "production") {
        console.warn(
          "Redis World initialization failed in production. Continuing without it."
        );
      } else {
        throw error;
      }
    }
  }
}

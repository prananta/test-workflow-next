export async function register() {
  if (process.env.NEXT_RUNTIME !== "edge") {
    try {
      // Use Function constructor to create a dynamic import that absolutely cannot
      // be statically analyzed or transformed by Next.js bundler
      // This prevents the bundler from converting import() to require()
      console.log("Starting Redis World...");

      // Create a function that performs dynamic import - this cannot be statically analyzed
      const dynamicImport = new Function(
        "specifier",
        "return import(specifier)"
      );

      // Use the dynamic import function to load ES modules
      const redisModule = await dynamicImport("@workflow-worlds/redis");
      const runtimeModule = await dynamicImport("workflow/runtime");

      const { createWorld } = redisModule;
      const { getWorld } = runtimeModule;

      let world = getWorld();
      if (!world) {
        world = createWorld() as typeof world;
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

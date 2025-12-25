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
      // In Vercel/serverless, the module needs to be available in node_modules
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
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Failed to initialize Redis World:", errorMessage);

      // In Vercel/serverless environments, the package might not be available
      // due to output file tracing limitations. Log a helpful message.
      if (
        errorMessage.includes("Cannot find") ||
        errorMessage.includes("MODULE_NOT_FOUND")
      ) {
        console.warn(
          "Redis World package not found. This may be due to Vercel's output file tracing. " +
            "Ensure @workflow-worlds/redis is in dependencies and outputFileTracingIncludes is configured."
        );
      }

      // In production/serverless, continue without Redis World
      // The app can still function, but workflows won't be persisted
      if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
        console.warn(
          "Redis World initialization failed in production. Continuing without it."
        );
      } else {
        // In development, throw to surface the issue
        throw error;
      }
    }
  }
}

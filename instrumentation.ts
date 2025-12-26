export async function register() {
  if (process.env.NEXT_RUNTIME !== "edge") {
    console.log(`Starting Postgres World...`);
    const { getWorld } = await import("./workflows/world/postgres");
    await getWorld().start?.();
    console.log(`Postgres World started`);
  }
}

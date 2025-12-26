export async function register() {
  if (process.env.NEXT_RUNTIME !== "edge") {
    console.log(`Starting World...`);
    const { getWorld } = await import("./workflows/world");
    await getWorld().start?.();
    console.log(`World started`);
  }
}

import { createWorld } from "@workflow/world-postgres";
import { setWorld } from "workflow/runtime";

export const getWorld = () => {
  console.log(`Getting Postgres World...`);
  const world = createWorld();
  setWorld(world);
  console.log(`Postgres World created`);

  return world;
};

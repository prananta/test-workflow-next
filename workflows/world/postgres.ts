import { createWorld } from "@workflow/world-postgres";

export const getWorld = () => {
  console.log(`Getting Postgres World...`);
  const world = createWorld();
  console.log(`Postgres World created`);

  return world;
};

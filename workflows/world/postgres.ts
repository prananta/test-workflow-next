import { createWorld } from "@workflow/world-postgres";
import { getWorld as getWorkflowWorld } from "workflow/runtime";

export const getWorld = () => {
  console.log(`Getting Postgres World...`);
  let world = getWorkflowWorld();
  if (!world) {
    world = createWorld();
    console.log(`Postgres World created`);
  }
  return world;
};

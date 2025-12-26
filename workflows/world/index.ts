//import { createWorld } from "@workflow/world-postgres";
import { createWorld } from "@workflow-worlds/redis";
import { getWorld as getWorkflowWorld } from "workflow/runtime";

export const getWorld = () => {
  console.log(`Getting World...`);
  let world = getWorkflowWorld();
  if (!world) {
    // @ts-expect-error - createWorld is not typed
    world = createWorld();
    console.log(`World created`);
  }
  return world;
};

import { createWorld } from "@workflow/world-postgres";
import { getWorld as getWorkflowWorld } from "workflow/runtime";

export const getWorld = () => {
  let world = getWorkflowWorld();
  if (!world) {
    world = createWorld();
  }
  return world;
};

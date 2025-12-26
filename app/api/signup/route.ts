import { start } from "workflow/api";
import { handleUserSignup } from "@/workflows/user-signup";
import { NextResponse } from "next/server";
import { getWorld } from "@/workflows/world/postgres";

export async function POST(request: Request) {
  console.log(`Receiving post request to /api/signup`);
  const { email } = await request.json();

  console.log(`Starting Postgres World...`);
  await getWorld().start?.();

  // Executes asynchronously and doesn't block your app
  await start(handleUserSignup, [email]);
  return NextResponse.json({
    message: "User signup workflow started",
  });
}

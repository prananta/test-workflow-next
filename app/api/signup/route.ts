import { start } from "workflow/api";
import { handleUserSignup } from "@/workflows/user-signup";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log(`Receiving post request to /api/signup`);
  const { email } = await request.json();

  // Executes asynchronously and doesn't block your app
  await start(handleUserSignup, [email]);
  return NextResponse.json({
    message: "User signup workflow started",
  });
}

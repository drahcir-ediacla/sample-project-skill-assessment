import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Successfully logged out" }, { status: 200 });

  // Clear the authentication token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure only in production
    path: "/", // Apply to the root path
    expires: new Date(0), // Expired date to clear the cookie
  });

  return response;
}

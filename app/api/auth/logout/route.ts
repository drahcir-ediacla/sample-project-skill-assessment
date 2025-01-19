import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json(
    { message: "Successfully logged out" },
    { status: 200 }
  );

  // Clear the authentication token cookie
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure only in production
    path: "/", // Clear cookie across the entire site
    expires: new Date(0), // Set expiration to a past date
  });

  return response;
}

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = <string>process.env.TOKEN_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("TOKEN_SECRET_KEY is not defined in environment variables");
}

export function GET(request: NextRequest) {
  // Extract the token value from cookies
  const tokenCookie = request.cookies.get("token");
  const token = tokenCookie?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Validate token
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Authenticated User:", decoded);
    return NextResponse.json({ message: "Authorized", user: decoded });
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}

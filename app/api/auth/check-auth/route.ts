import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { readData } from "@/app/utils/dataHandler";

const SECRET_KEY = <string>process.env.TOKEN_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("TOKEN_SECRET_KEY is not defined in environment variables");
}

export function GET(request: NextRequest) {
  // Extract the token value from cookies
  const tokenCookie = request.cookies.get("auth_token");
  const token = tokenCookie?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Validate token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Optionally fetch user data from the database (if needed)
    const data = readData();
    const user = data.users.find((u) => u.id === (decoded as any).id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Authorized",
      // user: decoded,
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.firstname,
      type: user.type,
      status: user.status
    }, { status: 200 });
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}

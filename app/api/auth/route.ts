import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { readData } from "@/app/utils/dataHandler";

const SECRET_KEY = process.env.TOKEN_SECRET_KEY || "";

interface User {
  id: number;
  username: string;
  password: string;
  type: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = readData();
    const users: User[] = data.users;
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const user = users.find((u) => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, type: user.type },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Set token as httpOnly cookie
    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Send cookie over HTTPS in production
      sameSite: "strict", // Restrict cookie sharing across sites
      maxAge: 3600, // 1 hour
      path: "/", // Cookie available across the entire app
    });

    return response;
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { readData } from "@/app/utils/dataHandler";

// Ensure the environment variable is present and typed
const SECRET_KEY = <string>process.env.TOKEN_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("TOKEN_SECRET_KEY is not defined in environment variables");
}

// Define the structure of the user data
interface User {
  id: number;
  username: string;
  password: string; // Hashed password
  type: string; // Role of the user (e.g., Writer, Editor)
}

// The POST handler
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = readData(); // Fetch existing data

    // Ensure the data structure is correct and provide a type assertion
    const users: User[] = data.users as User[];

    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Find the user by username
    const user = users.find((u) => u.username === username);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Validate the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.type },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Return the token
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error during authentication:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

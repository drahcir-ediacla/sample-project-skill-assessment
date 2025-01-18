import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { readData, writeData } from "@/app/utils/dataHandler";

export function GET() {
    try {
      const data = readData(); // Read data from `data.json`
      const users = data.users || [];
      return NextResponse.json(users, { status: 200 }); // Respond with users data
    } catch (error) {
      console.error("Error reading users data:", error); // Log detailed error
      return NextResponse.json(
        { error: "Failed to retrieve users data" },
        { status: 500 }
      );
    }
  }

  export async function POST(request: NextRequest) {
    try {
      const data = readData(); // Read existing data
      const body = await request.json(); // Parse JSON payload from request body
  
      // Validate payload
      const { firstname, lastname, username, password, type, status } = body;
      if (!firstname || !lastname || !username || !password || !type || !status) {
        return NextResponse.json(
          { error: "Missing required fields: firstname, lastname, username, password, type, status" },
          { status: 400 }
        );
      }
  
      // Check if the username is already taken
      const existingUser = data.users.find((user) => user.username === username);
      if (existingUser) {
        return NextResponse.json(
          { error: "Username already exists" },
          { status: 400 }
        );
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Generate a new ID
      const newUserId = data.users.length ? data.users[data.users.length - 1].id + 1 : 1;
  
      // Create new user object
      const newUser = {
        id: newUserId,
        firstname,
        lastname,
        username,
        password: hashedPassword, // Store hashed password
        type,
        status,
      };
  
      // Add the new user to the data
      data.users.push(newUser);
      writeData(data); // Save updated data to `data.json`
  
      return NextResponse.json({ id: newUserId, username }, { status: 201 }); // Respond with created user (excluding sensitive data)
    } catch (error) {
      console.error("Error creating user:", error); // Log detailed error
      return NextResponse.json({ error: "Failed to create new user" }, { status: 500 });
    }
  }

  
  export async function PATCH(request: NextRequest) {
    try {
      const data = readData(); // Read existing data
      const body = await request.json(); // Parse JSON payload from request body
  
      // Validate payload
      const { id, firstname, lastname, username, password, type, status } = body;
      if (!id) {
        return NextResponse.json(
          { error: "Missing required field: id" },
          { status: 400 }
        );
      }
  
      // Find the user by ID
      const userIndex = data.users.findIndex((user) => user.id === id);
      if (userIndex === -1) {
        return NextResponse.json(
          { error: `User with ID ${id} not found` },
          { status: 404 }
        );
      }
  
      // If username is provided and different from existing username, check if it exists
      if (username && username !== data.users[userIndex].username) {
        // Check if the new username already exists
        const existingUser = data.users.find((user) => user.username === username);
        if (existingUser) {
          return NextResponse.json(
            { error: "Username already exists" },
            { status: 400 }
          );
        }
        // Update username if it's not taken
        data.users[userIndex].username = username;
      }
  
      // Hash the password if provided
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        data.users[userIndex].password = hashedPassword; // Update hashed password
      }
  
      // Update other fields if provided
      if (firstname) data.users[userIndex].firstname = firstname;
      if (lastname) data.users[userIndex].lastname = lastname;
      if (type) data.users[userIndex].type = type;
      if (status) data.users[userIndex].status = status;
  
      // Save updated data
      writeData(data);
  
      return NextResponse.json(
        { message: "User updated successfully", user: data.users[userIndex] },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating user:", error); // Log detailed error
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
  }
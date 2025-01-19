import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/app/utils/dataHandler";

export function GET() {
    try {
      const data = readData(); // Read data from `data.json`
      const companies = data.companies || [];
      console.log("Companies:", companies); // Log companies data
      return NextResponse.json(companies, { status: 200 }); // Respond with companies data
    } catch (error) {
      console.error("Error reading companies data:", error); // Log detailed error
      return NextResponse.json(
        { error: "Failed to retrieve companies data" },
        { status: 500 }
      );
    }
  }
  

  export async function POST(request: NextRequest) {
    try {
      const data = readData(); // Read existing data
      const body = await request.json(); // Parse JSON payload
  
      // Validate payload
      const { logo, name, status } = body;
      if (!logo || !name || !status) {
        return NextResponse.json(
          { error: "Missing required fields: logo, name, status" },
          { status: 400 }
        );
      }
  
      // Validate status value
      if (!["Active", "Inactive"].includes(status)) {
        return NextResponse.json(
          { error: "Invalid status. Must be 'Active' or 'Inactive'" },
          { status: 400 }
        );
      }
  
      // Check for duplicate company name
      const isDuplicate = data.companies.some(
        (company) => company.name.toLowerCase() === name.toLowerCase()
      );
      if (isDuplicate) {
        return NextResponse.json(
          { error: "A company with this name already exists" },
          { status: 400 }
        );
      }
  
      // Generate a new ID
      const newCompanyId = data.companies.length
        ? data.companies[data.companies.length - 1].id + 1
        : 1;
  
      // Create new company object
      const newCompany = {
        id: newCompanyId,
        logo,
        name,
        status,
        // createdAt: new Date().toISOString(), // Optional timestamp
      };
  
      // Add the new company to the data
      data.companies.push(newCompany);
  
      // Save updated data to `data.json`
      try {
        writeData(data);
      } catch (writeError) {
        console.error("Error writing to data.json:", writeError);
        return NextResponse.json(
          { error: "Failed to save company data" },
          { status: 500 }
        );
      }
  
      // Respond with created company
      return NextResponse.json(newCompany, { status: 201 });
    } catch (error) {
      console.error("Error creating company:", error); // Log detailed error
      return NextResponse.json(
        { error: "Failed to create new company" },
        { status: 500 }
      );
    }
  }


  export async function PUT(request: NextRequest) {
    try {
      const data = readData(); // Read existing data
      const body = await request.json(); // Parse JSON payload
  
      // Validate payload
      const { id, logo, name, status } = body;
      if (!id || (!logo && !name && !status)) {
        return NextResponse.json(
          { error: "Missing required fields: id and at least one field to update" },
          { status: 400 }
        );
      }
  
      // Validate status if provided
      if (status && !["Active", "Inactive"].includes(status)) {
        return NextResponse.json(
          { error: "Invalid status. Must be 'Active' or 'Inactive'" },
          { status: 400 }
        );
      }
  
      // Find the company by ID
      const companyIndex = data.companies.findIndex(
        (company) => company.id === id
      );
      if (companyIndex === -1) {
        return NextResponse.json(
          { error: "Company with the specified ID not found" },
          { status: 404 }
        );
      }
  
      // Update the company fields
      const company = data.companies[companyIndex];
      if (logo) company.logo = logo;
      if (name) company.name = name;
      if (status) company.status = status;
  
      // Save updated data to `data.json`
      try {
        writeData(data);
      } catch (writeError) {
        console.error("Error writing to data.json:", writeError);
        return NextResponse.json(
          { error: "Failed to save updated company data" },
          { status: 500 }
        );
      }
  
      // Respond with the updated company
      return NextResponse.json(company, { status: 200 });
    } catch (error) {
      console.error("Error updating company:", error); // Log detailed error
      return NextResponse.json(
        { error: "Failed to update company" },
        { status: 500 }
      );
    }
  }
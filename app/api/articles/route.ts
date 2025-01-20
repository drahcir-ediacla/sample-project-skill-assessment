import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/app/utils/dataHandler";

export function GET() {
  try {
    const data = readData(); // Read data from `data.json`
    const articles = data.articles || [];
    const companies = data.companies || [];
    const users = data.users || [];

    // Enrich articles with related data
    const enrichedArticles = articles.map((article) => {
      const company = companies.find((comp) => comp.id === article.company) || null;
      const writer = users.find((user) => user.id === article.writer) || null;
      const editor = users.find((user) => user.id === article.editor) || null;

      return {
        ...article,
        company, // Include company details
        writer, // Include writer details
        editor, // Include editor details
      };
    });

    return NextResponse.json(enrichedArticles, { status: 200 }); // Return enriched articles
  } catch (error) {
    console.error("Error enriching articles data:", error); // Log detailed error
    return NextResponse.json(
      { error: "Failed to retrieve and enrich articles data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = readData(); // Read existing data
    const body = await request.json(); // Parse JSON payload from request body

    // Validate payload
    const { image, title, link, date, content, status, writer, company } = body;
    if (!image || !title || !link || !date || !content || !status || !writer || !company) {
      return NextResponse.json(
        { error: "Missing required fields: image, title, link, date, content, status, writer, editor, company" },
        { status: 400 }
      );
    }

    // Generate a new ID
    const newArticleId = data.articles.length
      ? data.articles[data.articles.length - 1].id + 1
      : 1;

    // Create new article object
    const newArticle = {
      id: newArticleId,
      image,
      title,
      link,
      date,
      content,
      status,
      writer,
      editor: null,
      company,
    };

    // Add the new article to the data
    data.articles.push(newArticle);
    writeData(data); // Save updated data to `data.json`

    return NextResponse.json(newArticle, { status: 201 }); // Respond with created article
  } catch (error) {
    console.error("Error creating article:", error); // Log detailed error
    return NextResponse.json({ error: "Failed to create new article" }, { status: 500 });
  }
}


export async function PUT(request: NextRequest) {
  try {
    const data = readData(); // Read existing data
    const body = await request.json(); // Parse JSON payload from request body

    // Validate payload
    const { id, image, title, link, date, content, status, writer, editor, company } = body;
    if (!id || !image || !title || !link || !date || !content || !status || !writer || !editor || !company) {
      return NextResponse.json(
        { error: "Missing required fields: id, image, title, link, date, content, status, writer, editor, company" },
        { status: 400 }
      );
    }

    // Find the article to update
    const articleIndex = data.articles.findIndex((article) => article.id === id);
    if (articleIndex === -1) {
      return NextResponse.json(
        { error: `Article with ID ${id} not found` },
        { status: 404 }
      );
    }

    // Update the article details
    data.articles[articleIndex] = {
      id,
      image,
      title,
      link,
      date,
      content,
      status,
      writer,
      editor,
      company,
    };

    writeData(data); // Save updated data to `data.json`

    return NextResponse.json(data.articles[articleIndex], { status: 200 }); // Respond with updated article
  } catch (error) {
    console.error("Error updating article:", error); // Log detailed error
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

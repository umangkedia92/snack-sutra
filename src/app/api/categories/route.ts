import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { initializeSchema } from "@/lib/schema";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  try {
    await initializeSchema();

    const result = await db.execute(
      "SELECT * FROM categories ORDER BY display_order, name"
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await isAdminAuthenticated();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, display_order } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const result = await db.execute({
      sql: `INSERT INTO categories (name, slug, display_order) VALUES (?, ?, ?)`,
      args: [name, slug, display_order ?? 0],
    });

    return NextResponse.json(
      { id: Number(result.lastInsertRowid), slug },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

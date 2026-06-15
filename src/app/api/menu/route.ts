import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { initializeSchema } from "@/lib/schema";
import { seedDatabase } from "@/lib/seed";
import { isAdminAuthenticated } from "@/lib/admin-auth";

let seeded = false;

export async function GET(request: NextRequest) {
  try {
    await initializeSchema();

    if (!seeded) {
      await seedDatabase();
      seeded = true;
    }

    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    let result;
    if (all) {
      result = await db.execute(
        `SELECT mi.*, c.name as category_name
         FROM menu_items mi
         LEFT JOIN categories c ON mi.category_id = c.id
         ORDER BY c.display_order, mi.name`
      );
    } else {
      result = await db.execute(
        `SELECT mi.*, c.name as category_name
         FROM menu_items mi
         LEFT JOIN categories c ON mi.category_id = c.id
         WHERE mi.is_available = 1
         ORDER BY c.display_order, mi.name`
      );
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
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
    const { name, description, price, category_id, image_url, is_featured } =
      body;

    if (!name || price == null || !category_id) {
      return NextResponse.json(
        { error: "Name, price, and category_id are required" },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const result = await db.execute({
      sql: `INSERT INTO menu_items (name, slug, description, price, category_id, image_url, is_featured)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        name,
        slug,
        description || "",
        price,
        category_id,
        image_url || "/images/placeholder-food.jpg",
        is_featured ? 1 : 0,
      ],
    });

    return NextResponse.json(
      { id: Number(result.lastInsertRowid), slug },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create menu item:", error);
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}

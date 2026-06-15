import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await db.execute({
      sql: `SELECT mi.*, c.name as category_name
            FROM menu_items mi
            LEFT JOIN categories c ON mi.category_id = c.id
            WHERE mi.id = ?`,
      args: [id],
    });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Failed to fetch menu item:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await isAdminAuthenticated();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const fields: string[] = [];
    const args: (string | number | null)[] = [];

    if (body.name !== undefined) {
      fields.push("name = ?");
      args.push(body.name);
      fields.push("slug = ?");
      args.push(
        body.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      );
    }
    if (body.description !== undefined) {
      fields.push("description = ?");
      args.push(body.description);
    }
    if (body.price !== undefined) {
      fields.push("price = ?");
      args.push(body.price);
    }
    if (body.category_id !== undefined) {
      fields.push("category_id = ?");
      args.push(body.category_id);
    }
    if (body.image_url !== undefined) {
      fields.push("image_url = ?");
      args.push(body.image_url);
    }
    if (body.is_available !== undefined) {
      fields.push("is_available = ?");
      args.push(body.is_available ? 1 : 0);
    }
    if (body.is_featured !== undefined) {
      fields.push("is_featured = ?");
      args.push(body.is_featured ? 1 : 0);
    }

    if (fields.length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    fields.push("updated_at = datetime('now')");
    args.push(id);

    await db.execute({
      sql: `UPDATE menu_items SET ${fields.join(", ")} WHERE id = ?`,
      args,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update menu item:", error);
    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await isAdminAuthenticated();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await db.execute({
      sql: "DELETE FROM menu_items WHERE id = ?",
      args: [id],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete menu item:", error);
    return NextResponse.json(
      { error: "Failed to delete menu item" },
      { status: 500 }
    );
  }
}

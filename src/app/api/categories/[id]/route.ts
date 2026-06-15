import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

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
    if (body.display_order !== undefined) {
      fields.push("display_order = ?");
      args.push(body.display_order);
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
      sql: `UPDATE categories SET ${fields.join(", ")} WHERE id = ?`,
      args,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
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

    const items = await db.execute({
      sql: "SELECT COUNT(*) as count FROM menu_items WHERE category_id = ?",
      args: [id],
    });

    const count = items.rows[0].count as number;
    if (count > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete category: ${count} menu item(s) still belong to it`,
        },
        { status: 400 }
      );
    }

    await db.execute({
      sql: "DELETE FROM categories WHERE id = ?",
      args: [id],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

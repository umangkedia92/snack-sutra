import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await isAdminAuthenticated();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let result;
    if (status) {
      result = await db.execute({
        sql: "SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC",
        args: [status],
      });
    } else {
      result = await db.execute(
        "SELECT * FROM orders ORDER BY created_at DESC"
      );
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customer_name,
      customer_phone,
      delivery_address,
      delivery_notes,
      preferred_timing,
      items,
      subtotal,
    } = body;

    if (!customer_name || !customer_phone || !delivery_address || !items || !subtotal) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate order reference: SNK-YYYYMMDD-NNN
    const today = new Date();
    const dateStr =
      today.getFullYear().toString() +
      (today.getMonth() + 1).toString().padStart(2, "0") +
      today.getDate().toString().padStart(2, "0");

    const countResult = await db.execute({
      sql: `SELECT COUNT(*) as count FROM orders WHERE order_ref LIKE ?`,
      args: [`SNK-${dateStr}-%`],
    });

    const orderCount = (countResult.rows[0].count as number) + 1;
    const orderRef = `SNK-${dateStr}-${orderCount.toString().padStart(3, "0")}`;

    const result = await db.execute({
      sql: `INSERT INTO orders (order_ref, customer_name, customer_phone, delivery_address, delivery_notes, preferred_timing, items_json, subtotal)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        orderRef,
        customer_name,
        customer_phone,
        delivery_address,
        delivery_notes || "",
        preferred_timing || "ASAP",
        JSON.stringify(items),
        subtotal,
      ],
    });

    return NextResponse.json(
      {
        id: Number(result.lastInsertRowid),
        order_ref: orderRef,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

"use client";

import { useState, useEffect } from "react";
import StatsCard from "@/components/admin/StatsCard";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";
import { CURRENCY_SYMBOL } from "@/lib/constants";
import { MenuItem, Order } from "@/types";

type BadgeVariant = "success" | "warning" | "error" | "neutral" | "brand";

const statusBadgeVariant: Record<string, BadgeVariant> = {
  pending: "warning",
  confirmed: "brand",
  preparing: "neutral",
  delivered: "success",
  cancelled: "error",
};

function isToday(dateStr: string): boolean {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export default function AdminDashboardPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, ordersRes] = await Promise.all([
          fetch("/api/menu?all=true"),
          fetch("/api/orders"),
        ]);
        if (menuRes.ok) setMenuItems(await menuRes.json());
        if (ordersRes.ok) setOrders(await ordersRes.json());
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  const todayOrders = orders.filter((o) => isToday(o.created_at));
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.subtotal, 0);
  const outOfStock = menuItems.filter((i) => !i.is_available).length;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold text-stone-800">
          Dashboard
        </h1>
        <p className="text-sm text-stone-500 mt-1">{today}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Orders Today" value={todayOrders.length} />
        <StatsCard
          title="Revenue Today"
          value={`${CURRENCY_SYMBOL}${todayRevenue.toLocaleString("en-IN")}`}
          variant="brand"
        />
        <StatsCard title="Menu Items" value={menuItems.length} />
        <StatsCard
          title="Out of Stock"
          value={outOfStock}
          variant={outOfStock > 0 ? "warning" : "default"}
        />
      </div>

      <div>
        <h2 className="text-lg font-heading font-semibold text-stone-800 mb-3">
          Recent Orders
        </h2>
        {todayOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-stone-400">No orders yet today</p>
          </div>
        ) : (
          <div className="space-y-2">
            {todayOrders.map((order) => {
              let items: { name: string; quantity: number }[] = [];
              try {
                items = JSON.parse(order.items_json);
              } catch {
                /* ignore */
              }

              const time = new Date(order.created_at).toLocaleTimeString(
                "en-IN",
                { hour: "2-digit", minute: "2-digit" }
              );

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap items-center gap-3 text-sm"
                >
                  <span className="font-mono text-brand-600 font-medium">
                    {order.order_ref}
                  </span>
                  <span className="text-stone-700">{order.customer_name}</span>
                  <span className="text-stone-400">
                    {items.length} item{items.length !== 1 ? "s" : ""}
                  </span>
                  <span className="font-medium text-stone-800">
                    {CURRENCY_SYMBOL}{order.subtotal}
                  </span>
                  <span className="text-stone-400">{time}</span>
                  <Badge variant={statusBadgeVariant[order.status] || "neutral"}>
                    {order.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

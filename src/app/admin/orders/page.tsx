"use client";

import { useState, useEffect, useCallback } from "react";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";
import { CURRENCY_SYMBOL, ORDER_STATUSES } from "@/lib/constants";
import { Order } from "@/types";

type BadgeVariant = "success" | "warning" | "error" | "neutral" | "brand";

const statusBadgeVariant: Record<string, BadgeVariant> = {
  pending: "warning",
  confirmed: "brand",
  preparing: "neutral",
  delivered: "success",
  cancelled: "error",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const url =
        filter === "all" ? "/api/orders" : `/api/orders?status=${filter}`;
      const res = await fetch(url);
      if (res.ok) setOrders(await res.json());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    setLoading(true);
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId: number, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId ? { ...o, status: newStatus } : o
          )
        );
      }
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-semibold text-stone-800">
        Orders
      </h1>

      {/* Filter bar */}
      <div className="flex gap-2 flex-wrap">
        {["all", ...ORDER_STATUSES].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 text-sm rounded-lg capitalize transition-colors ${
              filter === status
                ? "bg-brand-400 text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-stone-400">
          No orders found
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const isExpanded = expandedId === order.id;
            let items: { name: string; quantity: number; price: number }[] = [];
            try {
              items = JSON.parse(order.items_json);
            } catch {
              /* ignore */
            }

            const time = new Date(order.created_at).toLocaleString("en-IN", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Collapsed row */}
                <button
                  onClick={() => toggleExpand(order.id)}
                  className="w-full text-left p-4 flex flex-wrap items-center gap-3 text-sm hover:bg-stone-50/50 transition-colors"
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
                  <Badge
                    variant={statusBadgeVariant[order.status] || "neutral"}
                  >
                    {order.status}
                  </Badge>
                  <svg
                    className={`ml-auto w-4 h-4 text-stone-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-stone-100 p-4 space-y-4 text-sm">
                    {/* Items */}
                    <div>
                      <p className="font-medium text-stone-700 mb-2">Items</p>
                      <div className="space-y-1">
                        {items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-stone-600"
                          >
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>
                              {CURRENCY_SYMBOL}
                              {(item.price * item.quantity).toFixed(0)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Customer details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-stone-400 text-xs">Phone</p>
                        <p className="text-stone-700">{order.customer_phone}</p>
                      </div>
                      <div>
                        <p className="text-stone-400 text-xs">Timing</p>
                        <p className="text-stone-700">
                          {order.preferred_timing || "-"}
                        </p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-stone-400 text-xs">
                          Delivery Address
                        </p>
                        <p className="text-stone-700">
                          {order.delivery_address}
                        </p>
                      </div>
                      {order.delivery_notes && (
                        <div className="sm:col-span-2">
                          <p className="text-stone-400 text-xs">Notes</p>
                          <p className="text-stone-700">
                            {order.delivery_notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Status update */}
                    <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                      <label className="text-sm text-stone-500">
                        Update Status:
                      </label>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order.id, e.target.value)
                        }
                        disabled={updatingId === order.id}
                        className="rounded-lg border border-stone-200 px-3 py-1.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 capitalize"
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s} className="capitalize">
                            {s}
                          </option>
                        ))}
                      </select>
                      {updatingId === order.id && <Spinner size="sm" />}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import MenuItemForm from "@/components/admin/MenuItemForm";
import { CURRENCY_SYMBOL } from "@/lib/constants";
import { MenuItem, Category } from "@/types";

export default function MenuManagementPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [menuRes, catRes] = await Promise.all([
        fetch("/api/menu?all=true"),
        fetch("/api/categories"),
      ]);
      if (menuRes.ok) setItems(await menuRes.json());
      if (catRes.ok) setCategories(await catRes.json());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleAvailability = async (item: MenuItem) => {
    try {
      await fetch(`/api/menu/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_available: item.is_available ? 0 : 1 }),
      });
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? { ...i, is_available: i.is_available ? 0 : 1 }
            : i
        )
      );
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/menu/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const openAdd = () => {
    setEditItem(undefined);
    setModalOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const handleSave = () => {
    setModalOpen(false);
    setEditItem(undefined);
    fetchData();
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-semibold text-stone-800">
          Menu Items
        </h1>
        <Button onClick={openAdd}>Add New Item</Button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-left text-stone-500">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">In Stock</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-stone-50 hover:bg-stone-50/50"
              >
                <td className="px-6 py-4 font-medium text-stone-800">
                  {item.name}
                  {item.is_featured ? (
                    <span className="ml-2 text-xs text-amber-500">Featured</span>
                  ) : null}
                </td>
                <td className="px-6 py-4 text-stone-500">
                  {item.category_name || "-"}
                </td>
                <td className="px-6 py-4 text-stone-700">
                  {CURRENCY_SYMBOL}{item.price}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleAvailability(item)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      item.is_available ? "bg-brand-400" : "bg-stone-300"
                    }`}
                    aria-label={
                      item.is_available ? "Mark unavailable" : "Mark available"
                    }
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        item.is_available ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteTarget(item)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <div className="p-8 text-center text-stone-400">
            No menu items yet. Add your first item.
          </div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-stone-800">
                  {item.name}
                  {item.is_featured ? (
                    <span className="ml-2 text-xs text-amber-500">Featured</span>
                  ) : null}
                </p>
                <p className="text-xs text-stone-500">
                  {item.category_name || "Uncategorized"}
                </p>
              </div>
              <p className="font-medium text-stone-800">
                {CURRENCY_SYMBOL}{item.price}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => toggleAvailability(item)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  item.is_available ? "bg-brand-400" : "bg-stone-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    item.is_available ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteTarget(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-stone-400">
            No menu items yet. Add your first item.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditItem(undefined);
        }}
        title={editItem ? "Edit Menu Item" : "Add Menu Item"}
      >
        <MenuItemForm
          item={editItem}
          categories={categories}
          onSave={handleSave}
          onCancel={() => {
            setModalOpen(false);
            setEditItem(undefined);
          }}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete Item"
      >
        <p className="text-sm text-stone-600 mb-4">
          Are you sure you want to delete{" "}
          <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

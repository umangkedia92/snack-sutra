"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import { Category } from "@/types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<(Category & { item_count?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const [catRes, menuRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/menu?all=true"),
      ]);
      if (catRes.ok && menuRes.ok) {
        const cats: Category[] = await catRes.json();
        const items: { category_id: number }[] = await menuRes.json();

        // Count items per category
        const countMap: Record<number, number> = {};
        items.forEach((item) => {
          countMap[item.category_id] = (countMap[item.category_id] || 0) + 1;
        });

        setCategories(
          cats.map((c) => ({ ...c, item_count: countMap[c.id] || 0 }))
        );
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const openAdd = () => {
    setEditCat(null);
    setName("");
    setDisplayOrder("0");
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditCat(cat);
    setName(cat.name);
    setDisplayOrder(cat.display_order.toString());
    setFormError("");
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Name is required");
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      const payload = {
        name: name.trim(),
        display_order: Number(displayOrder) || 0,
      };

      const url = editCat ? `/api/categories/${editCat.id}` : "/api/categories";
      const method = editCat ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError("");

    try {
      const res = await fetch(`/api/categories/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          data.error || "Failed to delete category"
        );
      }

      setDeleteTarget(null);
      fetchCategories();
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Failed to delete"
      );
    } finally {
      setDeleting(false);
    }
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
          Categories
        </h1>
        <Button onClick={openAdd}>Add Category</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-left text-stone-500">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Order</th>
              <th className="px-6 py-3 font-medium">Items</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="border-b border-stone-50 hover:bg-stone-50/50"
              >
                <td className="px-6 py-4 font-medium text-stone-800">
                  {cat.name}
                </td>
                <td className="px-6 py-4 text-stone-500">
                  {cat.display_order}
                </td>
                <td className="px-6 py-4 text-stone-500">
                  {cat.item_count ?? 0}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(cat)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteError("");
                        setDeleteTarget(cat);
                      }}
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
        {categories.length === 0 && (
          <div className="p-8 text-center text-stone-400">
            No categories yet. Add your first category.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editCat ? "Edit Category" : "Add Category"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
              {formError}
            </p>
          )}
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Appetizers"
          />
          <Input
            label="Display Order"
            type="number"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(e.target.value)}
            min="0"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : editCat ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete Category"
      >
        {deleteError && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">
            {deleteError}
          </p>
        )}
        <p className="text-sm text-stone-600 mb-4">
          Are you sure you want to delete{" "}
          <strong>{deleteTarget?.name}</strong>? Categories with assigned menu
          items cannot be deleted.
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

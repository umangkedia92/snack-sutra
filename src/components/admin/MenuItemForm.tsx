"use client";

import { useState, FormEvent } from "react";
import { MenuItem, Category } from "@/types";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface MenuItemFormProps {
  item?: MenuItem;
  categories: Category[];
  onSave: () => void;
  onCancel: () => void;
}

export default function MenuItemForm({
  item,
  categories,
  onSave,
  onCancel,
}: MenuItemFormProps) {
  const isEdit = Boolean(item);

  const [name, setName] = useState(item?.name ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [price, setPrice] = useState(item?.price?.toString() ?? "");
  const [categoryId, setCategoryId] = useState(
    item?.category_id?.toString() ?? (categories[0]?.id?.toString() ?? "")
  );
  const [imageUrl, setImageUrl] = useState(item?.image_url ?? "");
  const [isFeatured, setIsFeatured] = useState(Boolean(item?.is_featured));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!price || Number(price) <= 0) errs.price = "Valid price is required";
    if (!categoryId) errs.category = "Category is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        category_id: Number(categoryId),
        image_url: imageUrl.trim() || null,
        is_featured: isFeatured ? 1 : 0,
      };

      const url = isEdit ? `/api/menu/${item!.id}` : "/api/menu";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      onSave();
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Failed to save item" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.form && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          {errors.form}
        </p>
      )}

      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        placeholder="e.g. Paneer Tikka"
      />

      <Input
        as="textarea"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="A short description of the item"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={errors.price}
          placeholder="0.00"
        />

        <Input as="select" label="Category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} error={errors.category}>
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Input>
      </div>

      <Input
        label="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="https://..."
      />

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
          className="h-4 w-4 rounded border-stone-300 text-brand-400 focus:ring-brand-300"
        />
        <span className="text-sm text-stone-700">Featured item</span>
      </label>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="ghost" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : isEdit ? "Update Item" : "Add Item"}
        </Button>
      </div>
    </form>
  );
}

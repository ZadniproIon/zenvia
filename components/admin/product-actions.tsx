"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Edit3, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

import { createProduct, deleteProduct, updateProduct } from "@/app/actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export type CategoryOption = {
  id: string;
  name: string;
};

export function AddProductDialog({ categories }: { categories: CategoryOption[] }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    discount: "",
    image: "/figma-product/product-main.png",
    stock: "15",
    categoryId: categories[0]?.id || "",
    dressStyle: "Casual",
    isNewArrival: true,
    isTopSelling: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.categoryId) {
      toast.error("Please fill in all required fields.");
      return;
    }

    startTransition(async () => {
      const res = await createProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        discount: formData.discount || null,
        image: formData.image,
        stock: parseInt(formData.stock, 10) || 10,
        categoryId: formData.categoryId,
        dressStyle: formData.dressStyle,
        isNewArrival: formData.isNewArrival,
        isTopSelling: formData.isTopSelling,
      });

      if (res.success) {
        toast.success(`Product "${formData.name}" created successfully!`);
        setOpen(false);
        setFormData({
          name: "",
          description: "",
          price: "",
          originalPrice: "",
          discount: "",
          image: "/figma-product/product-main.png",
          stock: "15",
          categoryId: categories[0]?.id || "",
          dressStyle: "Casual",
          isNewArrival: true,
          isTopSelling: false,
        });
      } else {
        toast.error(res.error || "Failed to create product.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black/90 cursor-pointer shadow-sm"
          >
            <Plus className="size-4" />
            <span>Add New Product</span>
          </button>
        }
      />
      <DialogContent className="sm:max-w-[550px] p-6 bg-white rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-bold font-heading">Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label htmlFor="product-name" className="text-xs font-semibold text-black">Product Name *</Label>
            <Input
              id="product-name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Classic Heavyweight Tee"
              className="mt-1 h-10 rounded-xl bg-[#F0F0F0] border-0"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="category" className="text-xs font-semibold text-black">Category *</Label>
              <select
                id="category"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="mt-1 flex h-10 w-full rounded-xl bg-[#F0F0F0] px-3 py-2 text-sm border-0 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="dressStyle" className="text-xs font-semibold text-black">Dress Style</Label>
              <select
                id="dressStyle"
                name="dressStyle"
                value={formData.dressStyle}
                onChange={handleChange}
                className="mt-1 flex h-10 w-full rounded-xl bg-[#F0F0F0] px-3 py-2 text-sm border-0 focus:outline-none"
              >
                <option value="Casual">Casual</option>
                <option value="Formal">Formal</option>
                <option value="Party">Party</option>
                <option value="Gym">Gym</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="price" className="text-xs font-semibold text-black">Price ($) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="145"
                className="mt-1 h-10 rounded-xl bg-[#F0F0F0] border-0"
              />
            </div>
            <div>
              <Label htmlFor="originalPrice" className="text-xs font-semibold text-black">Original Price</Label>
              <Input
                id="originalPrice"
                name="originalPrice"
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="180"
                className="mt-1 h-10 rounded-xl bg-[#F0F0F0] border-0"
              />
            </div>
            <div>
              <Label htmlFor="stock" className="text-xs font-semibold text-black">Stock Qty</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="20"
                className="mt-1 h-10 rounded-xl bg-[#F0F0F0] border-0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image" className="text-xs font-semibold text-black">Image Path or URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/figma-home/new-1.png"
              className="mt-1 h-10 rounded-xl bg-[#F0F0F0] border-0"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-xs font-semibold text-black">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the material, fit, and details..."
              className="mt-1 rounded-xl bg-[#F0F0F0] border-0 resize-none"
            />
          </div>

          <div className="flex gap-4 pt-1">
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                name="isNewArrival"
                checked={formData.isNewArrival}
                onChange={handleChange}
                className="size-4 rounded accent-black"
              />
              <span>Mark as New Arrival</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                name="isTopSelling"
                checked={formData.isTopSelling}
                onChange={handleChange}
                className="size-4 rounded accent-black"
              />
              <span>Mark as Top Selling</span>
            </label>
          </div>

          <div className="flex gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-xl bg-black text-white hover:bg-black/90"
            >
              {isPending ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteProductButton({ productId, productName }: { productId: string; productName: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      startTransition(async () => {
        const res = await deleteProduct(productId);
        if (res.success) {
          toast.success(`Deleted product "${productName}".`);
        } else {
          toast.error(res.error || "Failed to delete product.");
        }
      });
    }
  };

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleDelete}
      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer disabled:opacity-50"
      title="Delete Product"
    >
      <Trash2 className="size-4" />
    </button>
  );
}

import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { AddProductDialog, DeleteProductButton } from "@/components/admin/product-actions";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      select: { id: true, name: true },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 font-heading">Products Catalog</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and edit your store inventory ({products.length} items)</p>
        </div>
        <AddProductDialog categories={categories} />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-600 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Style</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status Badges</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden p-1 border border-gray-200">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/product/${product.id}`}
                          target="_blank"
                          className="font-bold text-gray-900 hover:text-blue-600 flex items-center gap-1"
                        >
                          <span>{product.name}</span>
                          <ExternalLink className="size-3 text-gray-400" />
                        </Link>
                        <span className="text-xs text-gray-400 block">{product.id.slice(0, 10)}...</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{product.category.name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                      {product.dressStyle}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        product.stock > 10
                          ? "bg-green-50 text-green-700"
                          : product.stock > 0
                          ? "bg-orange-50 text-orange-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {product.isNewArrival && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px]">
                          New
                        </Badge>
                      )}
                      {product.isTopSelling && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">
                          Top Seller
                        </Badge>
                      )}
                      {product.discount && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-[10px]">
                          {product.discount}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DeleteProductButton productId={product.id} productName={product.name} />
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No products found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

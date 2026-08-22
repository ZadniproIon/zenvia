import Image from "next/image"
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { SiteHeader } from "@/components/site/header"
import { SiteFooter } from "@/components/site/footer"
import { AddToCartButton } from "@/components/add-to-cart-button"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-gray-50/50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="mb-2 text-sm font-medium text-blue-600">
                  {product.category?.name || "Uncategorized"}
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discount && (
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-600">
                    {product.discount}
                  </span>
                )}
              </div>

              {product.description && (
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600">{product.description}</p>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-yellow-400">★</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span className="text-sm text-gray-600">
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </div>

                <div className="flex gap-4">
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import prisma from "@/lib/prisma";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { containerClass } from "@/components/site/constants";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { ProductCard } from "@/components/product-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    select: { name: true, description: true, price: true },
  });

  if (!product) {
    return { title: "Product Not Found | ZENVIA" };
  }

  return {
    title: `${product.name} - $${product.price.toFixed(0)} | ZENVIA`,
    description: product.description || "Discover premium fashion pieces at Zenvia.",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      reviews: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product) {
    notFound();
  }

  // Fetch 4 related products from the same category (or top selling)
  const relatedProducts = await prisma.product.findMany({
    where: {
      id: { not: product.id },
      categoryId: product.categoryId,
    },
    take: 4,
    orderBy: { rating: "desc" },
  });

  const fallbackProducts =
    relatedProducts.length < 4
      ? await prisma.product.findMany({
          where: { id: { not: product.id } },
          take: 4,
          orderBy: { createdAt: "desc" },
        })
      : relatedProducts;

  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader />

      <main className={`${containerClass} pt-6 pb-20 sm:pt-8`}>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2.5 text-sm text-black/60 sm:text-base pb-8">
          <Link href="/" className="transition hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="transition hover:text-black">
            Shop
          </Link>
          <span>/</span>
          {product.category && (
            <>
              <Link href={`/shop?category=${product.category.slug || product.category.name.toLowerCase()}`} className="transition hover:text-black">
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="font-medium text-black line-clamp-1">{product.name}</span>
        </nav>

        {/* Main Product Details View */}
        <ProductDetailView product={product} />

        {/* You Might Also Like Section */}
        <section className="mt-20 sm:mt-28 space-y-10 sm:space-y-14">
          <div className="text-center">
            <h2 className="font-heading text-[32px] font-extrabold uppercase leading-none tracking-[-0.04em] text-black sm:text-[40px] lg:text-[48px]">
              You might also like
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-5">
            {fallbackProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                id={relProduct.id}
                name={relProduct.name}
                image={relProduct.image}
                price={relProduct.price}
                originalPrice={relProduct.originalPrice}
                discount={relProduct.discount}
                rating={relProduct.rating}
              />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

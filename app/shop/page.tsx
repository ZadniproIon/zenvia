import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Metadata } from "next";

import prisma from "@/lib/prisma";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { containerClass } from "@/components/site/constants";
import { ProductCard } from "@/components/product-card";
import { ShopFilterSidebar } from "@/components/shop/shop-filter-sidebar";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop All Collections | ZENVIA",
  description: "Browse our complete catalog of men's and women's clothing, jeans, shirts, and streetwear.",
};

const ITEMS_PER_PAGE = 9;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    dressStyle?: string;
    minPrice?: string;
    maxPrice?: string;
    size?: string;
    color?: string;
    sort?: string;
    page?: string;
    onSale?: string;
  }>;
}) {
  const params = await searchParams;

  const q = params.q || "";
  const categorySlug = params.category || "";
  const dressStyle = params.dressStyle || "";
  const minPrice = params.minPrice ? parseFloat(params.minPrice) : 0;
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : 99999;
  const sort = params.sort || "popular";
  const currentPage = parseInt(params.page || "1", 10) || 1;
  const onSale = params.onSale === "true";

  // Build Prisma where clause
  const whereClause: any = {
    price: {
      gte: minPrice,
      lte: maxPrice,
    },
  };

  if (q) {
    whereClause.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  if (categorySlug) {
    whereClause.category = {
      slug: categorySlug,
    };
  }

  if (dressStyle) {
    whereClause.dressStyle = dressStyle;
  }

  if (onSale) {
    whereClause.discount = { not: null };
  }

  if (params.size) {
    whereClause.sizes = { contains: params.size };
  }

  if (params.color) {
    whereClause.colors = { contains: params.color };
  }

  // Sorting
  let orderBy: any = { rating: "desc" };
  if (sort === "price-asc") orderBy = { price: "asc" };
  if (sort === "price-desc") orderBy = { price: "desc" };
  if (sort === "newest") orderBy = { createdAt: "desc" };

  const [products, totalCount, allCategories] = await Promise.all([
    prisma.product.findMany({
      where: whereClause,
      include: { category: true },
      orderBy,
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.product.count({ where: whereClause }),
    prisma.category.findMany(),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalCount);

  // Active Title for Page
  let pageTitle = "All Products";
  if (q) pageTitle = `Search: "${q}"`;
  else if (categorySlug) {
    const cat = allCategories.find((c) => c.slug === categorySlug);
    if (cat) pageTitle = cat.name;
  } else if (dressStyle) {
    pageTitle = dressStyle;
  } else if (onSale) {
    pageTitle = "On Sale";
  }

  const buildUrl = (newParams: Record<string, string | number>) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (categorySlug) p.set("category", categorySlug);
    if (dressStyle) p.set("dressStyle", dressStyle);
    if (params.minPrice) p.set("minPrice", params.minPrice);
    if (params.maxPrice) p.set("maxPrice", params.maxPrice);
    if (params.size) p.set("size", params.size);
    if (params.color) p.set("color", params.color);
    if (sort !== "popular") p.set("sort", sort);
    if (onSale) p.set("onSale", "true");

    Object.entries(newParams).forEach(([k, v]) => {
      if (v) p.set(k, v.toString());
      else p.delete(k);
    });

    return `/shop?${p.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader />

      <main className={`${containerClass} pt-6 pb-20 sm:pt-8`}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2.5 text-sm text-black/60 sm:text-base pb-6">
          <Link href="/" className="transition hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="transition hover:text-black">
            Shop
          </Link>
          {pageTitle !== "All Products" && (
            <>
              <span>/</span>
              <span className="font-medium text-black">{pageTitle}</span>
            </>
          )}
        </nav>

        <div className="grid gap-8 lg:grid-cols-[295px_minmax(0,1fr)] lg:gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <ShopFilterSidebar />
          </div>

          {/* Right Product Grid Area */}
          <div className="space-y-6">
            {/* Header & Controls Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <ShopFilterSidebar isMobileSheet />
                <h1 className="text-2xl sm:text-[32px] font-bold leading-none text-black font-heading">{pageTitle}</h1>
              </div>

              <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 text-sm sm:text-base">
                <p className="text-black/60 text-xs sm:text-sm">
                  Showing {startItem}-{endItem} of {totalCount} Products
                </p>

                {/* Sort Dropdown Menu */}
                <div className="relative group">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer py-1">
                    <span className="text-black/60">Sort by:</span>
                    <span className="font-semibold text-black capitalize">
                      {sort === "popular"
                        ? "Most Popular"
                        : sort === "price-asc"
                        ? "Price: Low to High"
                        : sort === "price-desc"
                        ? "Price: High to Low"
                        : "Newest"}
                    </span>
                    <ChevronDown className="size-4 text-black" />
                  </div>
                  <div className="absolute right-0 top-full hidden group-hover:block z-50 min-w-[180px] rounded-2xl border border-black/10 bg-white p-2 shadow-xl">
                    <Link
                      href={buildUrl({ sort: "popular", page: 1 })}
                      className="block rounded-xl px-3 py-2 text-xs sm:text-sm text-black/80 hover:bg-black hover:text-white transition"
                    >
                      Most Popular
                    </Link>
                    <Link
                      href={buildUrl({ sort: "newest", page: 1 })}
                      className="block rounded-xl px-3 py-2 text-xs sm:text-sm text-black/80 hover:bg-black hover:text-white transition"
                    >
                      Newest
                    </Link>
                    <Link
                      href={buildUrl({ sort: "price-asc", page: 1 })}
                      className="block rounded-xl px-3 py-2 text-xs sm:text-sm text-black/80 hover:bg-black hover:text-white transition"
                    >
                      Price: Low to High
                    </Link>
                    <Link
                      href={buildUrl({ sort: "price-desc", page: 1 })}
                      className="block rounded-xl px-3 py-2 text-xs sm:text-sm text-black/80 hover:bg-black hover:text-white transition"
                    >
                      Price: High to Low
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {products.length === 0 ? (
              <div className="py-20 text-center space-y-4 rounded-3xl border border-black/10 bg-[#F9F9F9] p-8">
                <h3 className="text-xl font-bold text-black">No products found</h3>
                <p className="text-sm text-black/60 max-w-sm mx-auto">
                  We couldn&apos;t find any items matching your current filters. Try resetting the filters or searching for something else.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/90 shadow-sm"
                >
                  Clear All Filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-5">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    brand={product.brand}
                    image={product.image}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    rating={product.rating}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 border-t border-black/10 pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {currentPage > 1 ? (
                    <Link
                      href={buildUrl({ page: currentPage - 1 })}
                      className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-4 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </Link>
                  ) : (
                    <div className="invisible sm:block">Previous</div>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Link
                        key={pageNum}
                        href={buildUrl({ page: pageNum })}
                        className={cn(
                          "flex size-10 items-center justify-center rounded-lg text-sm font-medium transition",
                          currentPage === pageNum
                            ? "bg-black text-white"
                            : "text-black/60 hover:bg-black/5 hover:text-black"
                        )}
                      >
                        {pageNum}
                      </Link>
                    ))}
                  </div>

                  {currentPage < totalPages ? (
                    <Link
                      href={buildUrl({ page: currentPage + 1 })}
                      className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-4 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
                    >
                      Next
                      <ChevronRight className="size-4" />
                    </Link>
                  ) : (
                    <div className="invisible sm:block">Next</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

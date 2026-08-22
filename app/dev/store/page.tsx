import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  SlidersHorizontal,
  Star,
} from "lucide-react";

import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { containerClass } from "@/components/site/constants";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";



const categoryLinks = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"] as const;
const dressStyles = ["Casual", "Formal", "Party", "Gym"] as const;
const sizeChips = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "4X-Large"] as const;
const paginationItems = ["1", "2", "3", "...", "8", "9", "10"] as const;
const colorDots: Array<{ color: string; selected?: boolean; light?: boolean }> = [
  { color: "#00C12B" },
  { color: "#F50606" },
  { color: "#F5DD06" },
  { color: "#F57906" },
  { color: "#06CAF5" },
  { color: "#063AF5", selected: true },
  { color: "#7D06F5" },
  { color: "#F506A4" },
  { color: "#FFFFFF", light: true },
  { color: "#000000" },
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[5px]" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, rating - index));
        return (
          <span key={index} className="relative block size-[18px]">
            <Star className="size-[18px] fill-[#FFC633]/25 text-[#FFC633]" strokeWidth={1.4} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="size-[18px] fill-[#FFC633] text-[#FFC633]" strokeWidth={1.4} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

import { Product } from "@prisma/client";
import prisma from "@/lib/prisma";

function PriceBlock({ price, originalPrice, discount }: { price: number; originalPrice?: number | null; discount?: string | null }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 text-[24px] font-bold leading-none tracking-[-0.03em] text-black sm:gap-3">
      <span>${price}</span>
      {originalPrice ? <span className="text-black/40 line-through">${originalPrice}</span> : null}
      {discount ? <span className="rounded-full bg-[#ff3333]/10 px-3.5 py-1.5 text-xs font-medium text-[#ff3333] sm:text-sm">{discount}</span> : null}
    </div>
  );
}

function StoreProductCard({ product }: { product: Product & { imageClassName?: string } }) {
  return (
    <Link href={`/product/${product.id}`} className="group block space-y-3.5">
      <div className="relative aspect-[295/298] overflow-hidden rounded-[20px] bg-[#F0EEED]">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 1024px) 50vw, 295px" className={cn("object-contain transition-transform group-hover:scale-105", product.imageClassName)} />
      </div>
      <div className="space-y-2.5">
        <h3 className="text-base font-bold leading-[1.35] text-black sm:text-[20px]">{product.name}</h3>
        <div className="flex items-center gap-[13px] text-xs text-black sm:text-sm">
          <RatingStars rating={product.rating} />
          <span>{product.rating.toFixed(1)}/<span className="text-black/60">5</span></span>
        </div>
        <PriceBlock price={product.price} originalPrice={product.originalPrice} discount={product.discount} />
      </div>
    </Link>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold leading-none text-black">{title}</h3>
        <ChevronDown className="size-4 text-black/60" />
      </div>
      {children}
    </section>
  );
}

export default async function StorePage() {
  const products = await prisma.product.findMany();
  
  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader />

      <main>
        <section className={`${containerClass} pt-8 sm:pt-10`}>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 text-sm text-black/60 sm:text-base">
            <Link href="/" className="transition hover:text-black">Home</Link>
            <span>/</span>
            <span className="text-black">Casual</span>
          </nav>

          <div className="mt-8 grid gap-6 lg:grid-cols-[295px_minmax(0,1fr)] lg:gap-5">
            <aside className="rounded-[20px] border border-black/10 px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-bold leading-none text-black">Filters</h2>
                <SlidersHorizontal className="size-5 text-black/40" />
              </div>

              <Separator className="my-6 bg-black/10" />

              <div className="space-y-5 text-base text-black/60">
                {categoryLinks.map((item) => (
                  <button key={item} type="button" className="flex w-full items-center justify-between text-left transition hover:text-black">
                    <span>{item}</span>
                    <ChevronRight className="size-4" />
                  </button>
                ))}
              </div>

              <Separator className="my-6 bg-black/10" />

              <FilterSection title="Price">
                <div className="space-y-3">
                  <div className="relative h-5">
                    <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-black/10" />
                    <div className="absolute left-[12%] right-[15%] top-1/2 h-0.5 -translate-y-1/2 bg-black" />
                    <span className="absolute left-[12%] top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
                    <span className="absolute right-[15%] top-1/2 size-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium text-black">
                    <span>$50</span>
                    <span>$200</span>
                  </div>
                </div>
              </FilterSection>

              <Separator className="my-6 bg-black/10" />

              <FilterSection title="Colors">
                <div className="grid grid-cols-5 gap-4">
                  {colorDots.map((dot, index) => (
                    <button
                      key={`${dot.color}-${index}`}
                      type="button"
                      aria-label={`Color ${index + 1}`}
                      className={cn(
                        "flex size-[37px] items-center justify-center rounded-full",
                        dot.light && "border border-black/10"
                      )}
                      style={{ backgroundColor: dot.color }}
                    >
                      {dot.selected ? <Check className="size-5 text-white" strokeWidth={3} /> : null}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <Separator className="my-6 bg-black/10" />

              <FilterSection title="Size">
                <div className="flex flex-wrap gap-2">
                  {sizeChips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      className={cn(
                        "rounded-full px-5 py-2.5 text-sm transition",
                        chip === "Large" ? "bg-black text-white" : "bg-[#F0F0F0] text-black/60 hover:text-black"
                      )}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <Separator className="my-6 bg-black/10" />

              <FilterSection title="Dress Style">
                <div className="space-y-5 text-base text-black/60">
                  {dressStyles.map((item) => (
                    <button key={item} type="button" className="flex w-full items-center justify-between text-left transition hover:text-black">
                      <span>{item}</span>
                      <ChevronRight className="size-4" />
                    </button>
                  ))}
                </div>
              </FilterSection>

              <button type="button" className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/90">
                Apply Filter
              </button>
            </aside>

            <div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-[32px] font-bold leading-none text-black">Casual</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
                  <p className="text-black/60">Showing 1-10 of 100 Products</p>
                  <button type="button" className="flex items-center gap-1 text-black/60">
                    <span>Sort by:</span>
                    <span className="font-medium text-black">Most Popular</span>
                    <ChevronDown className="size-4 text-black" />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <StoreProductCard key={product.name} product={product} />
                ))}
              </div>

              <div className="mt-9 border-t border-black/10 pt-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-3.5 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white">
                    <ChevronLeft className="size-4" />
                    Previous
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-0.5">
                    {paginationItems.map((item, index) => (
                      <button
                        key={`${item}-${index}`}
                        type="button"
                        className={cn(
                          "flex size-10 items-center justify-center rounded-lg text-sm font-medium",
                          item === "1" ? "bg-black/6 text-black" : "text-black/50"
                        )}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-3.5 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white">
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

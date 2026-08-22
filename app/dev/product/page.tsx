import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, Minus, MoreHorizontal, Plus, SlidersHorizontal, Star } from "lucide-react";

import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { containerClass } from "@/components/site/constants";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Review = {
  name: string;
  rating: number;
  text: string;
  date: string;
};

type RelatedProduct = {
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  imageClassName?: string;
};

const productImages = [
  { src: "/figma-product/product-main.png", alt: "One Life Graphic T-shirt front view" },
  { src: "/figma-product/product-thumb-2.png", alt: "One Life Graphic T-shirt alternate angle" },
  { src: "/figma-product/product-thumb-3.png", alt: "One Life Graphic T-shirt on model" },
] as const;

const sizeOptions = ["Small", "Medium", "Large", "X-Large"] as const;
const colorOptions: Array<{ name: string; value: string; active?: boolean }> = [
  { name: "Olive", value: "#4F5B37", active: true },
  { name: "Forest", value: "#314F4A" },
  { name: "Indigo", value: "#31344F" },
] as const;

const reviews: Review[] = [
  {
    name: "Sarah M.",
    rating: 4.5,
    text: "I absolutely love this t-shirt. The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    date: "Posted on August 14, 2023",
  },
  {
    name: "Alex M.",
    rating: 5,
    text: "The t-shirt exceeded my expectations. The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    date: "Posted on August 15, 2023",
  },
  {
    name: "Liam O.",
    rating: 4,
    text: "This shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    date: "Posted on August 16, 2023",
  },
  {
    name: "Olivia P.",
    rating: 4.5,
    text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
    date: "Posted on August 17, 2023",
  },
  {
    name: "Ethan V.",
    rating: 4,
    text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    date: "Posted on August 18, 2023",
  },
  {
    name: "Ava H.",
    rating: 5,
    text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
    date: "Posted on August 19, 2023",
  },
];

const relatedProducts: RelatedProduct[] = [
  {
    name: "Polo with Contrast Trims",
    image: "/figma-product/related-1.png",
    price: 212,
    originalPrice: 242,
    discount: "-20%",
    rating: 4,
    imageClassName: "scale-[1.08] translate-y-5",
  },
  {
    name: "Gradient Graphic T-shirt",
    image: "/figma-product/related-2.png",
    price: 145,
    rating: 3.5,
    imageClassName: "scale-[1.08] translate-y-5",
  },
  {
    name: "Polo with Tipping Details",
    image: "/figma-product/related-3.png",
    price: 180,
    rating: 4.5,
    imageClassName: "scale-[1.08] translate-y-5",
  },
  {
    name: "Black Striped T-shirt",
    image: "/figma-product/related-4.png",
    price: 120,
    originalPrice: 150,
    discount: "-30%",
    rating: 5,
    imageClassName: "scale-[1.08] translate-y-4",
  },
];

function RatingStars({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-[5px]" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, rating - index));
        return (
          <span key={index} className="relative block" style={{ width: size, height: size }}>
            <Star className="text-[#FFC633] fill-[#FFC633]/25" style={{ width: size, height: size }} strokeWidth={1.4} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="text-[#FFC633] fill-[#FFC633]" style={{ width: size, height: size }} strokeWidth={1.4} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function PriceBlock({ price, originalPrice, discount }: Pick<RelatedProduct, "price" | "originalPrice" | "discount">) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 text-[24px] font-bold leading-none tracking-[-0.03em] text-black sm:gap-3">
      <span>${price}</span>
      {originalPrice ? <span className="text-black/40 line-through">${originalPrice}</span> : null}
      {discount ? (
        <span className="rounded-full bg-[#ff3333]/10 px-3.5 py-1.5 text-xs font-medium text-[#ff3333] sm:text-sm">{discount}</span>
      ) : null}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-[20px] border border-black/10 bg-white px-6 py-6 sm:px-8 sm:py-7">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-4">
          <RatingStars rating={review.rating} size={22} />
          <div className="flex items-center gap-1.5">
            <h3 className="text-xl font-bold leading-none text-black">{review.name}</h3>
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#01AB31] text-white">
              <Check className="size-3.5 stroke-[3]" />
            </span>
          </div>
        </div>
        <button type="button" aria-label={`More options for ${review.name}'s review`} className="text-black/40 transition hover:text-black">
          <MoreHorizontal className="size-5" />
        </button>
      </div>
      <p className="mt-3 text-base leading-[22px] text-black/60">&ldquo;{review.text}&rdquo;</p>
      <p className="mt-6 text-base font-medium leading-[22px] text-black/60">{review.date}</p>
    </article>
  );
}

function RelatedProductCard({ product }: { product: RelatedProduct }) {
  return (
    <article className="space-y-3.5">
      <div className="relative aspect-[295/298] overflow-hidden rounded-[20px] bg-[#E2E2E2]">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 50vw, 295px" className={cn("object-contain", product.imageClassName)} />
      </div>
      <div className="space-y-2.5">
        <h3 className="text-base font-bold leading-[1.35] text-black sm:text-[20px]">{product.name}</h3>
        <div className="flex items-center gap-[13px] text-xs text-black sm:text-sm">
          <RatingStars rating={product.rating} />
          <span>{product.rating.toFixed(1)}/<span className="text-black/60">5</span></span>
        </div>
        <PriceBlock price={product.price} originalPrice={product.originalPrice} discount={product.discount} />
      </div>
    </article>
  );
}

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader />

      <main>
        <section className={`${containerClass} pt-8 sm:pt-10`}>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 text-sm text-black/60 sm:text-base">
            <Link href="/" className="transition hover:text-black">Home</Link>
            <span>/</span>
            <Link href="#shop" className="transition hover:text-black">Shop</Link>
            <span>/</span>
            <Link href="#" className="transition hover:text-black">Men</Link>
            <span>/</span>
            <span className="text-black">T-shirts</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[610px_minmax(0,1fr)] lg:gap-10">
            <div className="grid gap-4 sm:grid-cols-[152px_minmax(0,1fr)]">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-1 sm:grid-rows-3 sm:gap-[14px]">
                {productImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    className={cn(
                      "relative aspect-[152/167] overflow-hidden rounded-[20px] bg-[#E2E2E2]",
                      index === 0 && "border border-black"
                    )}
                    aria-label={`View product image ${index + 1}`}
                  >
                    <Image src={image.src} alt={image.alt} fill sizes="152px" className={cn("object-cover", index === 0 ? "object-center" : "object-cover")} />
                  </button>
                ))}
              </div>

              <div className="relative min-h-[420px] overflow-hidden rounded-[20px] bg-[#E2E2E2] sm:min-h-[530px]">
                <Image src="/figma-product/product-main.png" alt="One Life Graphic T-shirt" fill priority sizes="(max-width: 1024px) 100vw, 444px" className="object-contain scale-[1.06]" />
              </div>
            </div>

            <div className="max-w-[600px]">
              <h1 className="font-heading text-[34px] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-black sm:text-[40px]">
                One Life Graphic T-shirt
              </h1>

              <div className="mt-3 flex items-center gap-4 text-sm sm:text-base">
                <RatingStars rating={4.5} size={24} />
                <span>4.5/<span className="text-black/60">5</span></span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-[32px] font-bold leading-none tracking-[-0.03em]">
                <span>$260</span>
                <span className="text-black/30 line-through">$300</span>
                <span className="rounded-full bg-[#ff3333]/10 px-3.5 py-1.5 text-base font-medium text-[#ff3333]">-40%</span>
              </div>

              <p className="mt-5 max-w-[590px] text-base leading-[22px] text-black/60">
                This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
              </p>

              <Separator className="my-6 bg-black/10" />

              <div>
                <p className="text-base text-black/60">Select Colors</p>
                <div className="mt-4 flex items-center gap-4">
                  {colorOptions.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      aria-label={color.name}
                      className="flex size-[37px] items-center justify-center rounded-full"
                      style={{ backgroundColor: color.value }}
                    >
                      {color.active ? <Check className="size-5 text-white" strokeWidth={3} /> : null}
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="my-6 bg-black/10" />

              <div>
                <p className="text-base text-black/60">Choose Size</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {sizeOptions.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={cn(
                        "rounded-full px-6 py-3 text-base transition",
                        size === "Large" ? "bg-black font-medium text-white" : "bg-[#F0F0F0] text-black/60 hover:text-black"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="my-6 bg-black/10" />

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex h-[52px] items-center justify-between rounded-full bg-[#F0F0F0] px-5 sm:w-[170px]">
                  <button type="button" aria-label="Decrease quantity" className="text-black transition hover:opacity-70">
                    <Minus className="size-5" />
                  </button>
                  <span className="text-base font-medium">1</span>
                  <button type="button" aria-label="Increase quantity" className="text-black transition hover:opacity-70">
                    <Plus className="size-5" />
                  </button>
                </div>
                <button type="button" className="inline-flex h-[52px] flex-1 items-center justify-center rounded-full bg-black px-8 text-base font-medium text-white transition hover:bg-black/90">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={`${containerClass} pt-14 sm:pt-16`}>
          <div className="grid grid-cols-3 border-b border-black/10 text-center text-base sm:text-[20px]">
            <button type="button" className="px-4 py-5 text-black/60">Product Details</button>
            <button type="button" className="border-b-2 border-black px-4 py-5 font-medium text-black">Rating &amp; Reviews</button>
            <button type="button" className="px-4 py-5 text-black/60">FAQs</button>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-end gap-2">
              <h2 className="text-2xl font-bold leading-none text-black">All Reviews</h2>
              <span className="text-base leading-[22px] text-black/60">(451)</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="inline-flex size-12 items-center justify-center rounded-full bg-[#F0F0F0] text-black">
                <SlidersHorizontal className="size-5" />
              </button>
              <button type="button" className="inline-flex h-12 items-center gap-3 rounded-full bg-[#F0F0F0] px-5 text-base font-medium text-black">
                Latest
                <ChevronDown className="size-4" />
              </button>
              <button type="button" className="inline-flex h-12 items-center justify-center rounded-full bg-black px-5 text-base font-medium text-white">
                Write a Review
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {reviews.map((review) => (
              <ReviewCard key={`${review.name}-${review.date}`} review={review} />
            ))}
          </div>

          <div className="mt-9 flex justify-center">
            <button type="button" className="inline-flex h-[52px] items-center justify-center rounded-full border border-black/10 px-10 text-base font-medium text-black transition hover:bg-black hover:text-white">
              Load More Reviews
            </button>
          </div>
        </section>

        <section className={`${containerClass} pt-18 sm:pt-24`}>
          <h2 className="text-center font-heading text-[34px] font-extrabold uppercase leading-none tracking-[-0.04em] text-black sm:text-[40px] lg:text-[48px]">
            You might also like
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-5">
            {relatedProducts.map((product) => (
              <RelatedProductCard key={product.name} product={product} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}


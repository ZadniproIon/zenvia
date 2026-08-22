"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/components/wishlist-provider";

export type ProductCardProps = {
  id: string;
  name: string;
  brand?: string | null;
  image: string;
  price: number;
  originalPrice?: number | null;
  discount?: string | null;
  rating: number;
  className?: string;
  imageClassName?: string;
};

export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[5.5px]" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, rating - index));

        return (
          <span key={index} className="relative block size-[16px] sm:size-[18px]">
            <Star className="size-[16px] sm:size-[18px] fill-[#FFC633]/25 text-[#FFC633]" strokeWidth={1.4} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="size-[16px] sm:size-[18px] fill-[#FFC633] text-[#FFC633]" strokeWidth={1.4} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function PriceBlock({ price, originalPrice, discount }: { price: number; originalPrice?: number | null; discount?: string | null }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[20px] font-bold leading-none tracking-[-0.03em] text-black sm:text-[24px]">
      <span>${price.toFixed(0)}</span>
      {originalPrice ? <span className="text-black/40 line-through">${originalPrice.toFixed(0)}</span> : null}
      {discount ? (
        <span className="rounded-full bg-[#ff3333]/10 px-2.5 py-1 text-xs font-semibold text-[#ff3333] sm:px-3 sm:py-1.5 sm:text-xs">
          {discount}
        </span>
      ) : null}
    </div>
  );
}

export function ProductCard({
  id,
  name,
  brand,
  image,
  price,
  originalPrice,
  discount,
  rating,
  className,
  imageClassName,
}: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const activeWishlist = isInWishlist(id);

  return (
    <article className={cn("group relative flex flex-col space-y-3.5", className)}>
      <div className="relative aspect-[295/298] w-full overflow-hidden rounded-[20px] bg-[#E2E2E2]">
        <Link href={`/product/${id}`} className="absolute inset-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 295px"
            className={cn("object-cover transition-transform duration-300 group-hover:scale-105", imageClassName)}
          />
        </Link>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist({ id, name, price, originalPrice, discount, image, rating });
          }}
          aria-label={activeWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-xs transition hover:scale-110",
            activeWishlist ? "text-red-500" : "text-black/40 hover:text-black"
          )}
        >
          <Heart className={cn("size-4.5", activeWishlist && "fill-red-500")} />
        </button>
      </div>

      <div className="flex-1 space-y-1.5">
        {brand && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-black/50 block">
            {brand}
          </span>
        )}
        <Link href={`/product/${id}`}>
          <h3 className="text-base font-bold leading-snug text-black transition group-hover:text-black/70 sm:text-[18px] lg:text-[19px] line-clamp-1">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-2.5 text-xs text-black sm:text-sm">
          <RatingStars rating={rating} />
          <span>
            {rating.toFixed(1)}/<span className="text-black/60">5</span>
          </span>
        </div>

        <PriceBlock price={price} originalPrice={originalPrice} discount={discount} />
      </div>
    </article>
  );
}

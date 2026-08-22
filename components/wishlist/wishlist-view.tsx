"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

import { useWishlist } from "@/components/wishlist-provider";
import { useCart } from "@/components/cart-provider";
import { RatingStars, PriceBlock } from "@/components/product-card";

export function WishlistView() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="py-20 text-center space-y-6 max-w-md mx-auto">
        <div className="flex justify-center">
          <div className="rounded-full bg-[#F0F0F0] p-8 text-black/30">
            <Heart className="size-16" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-heading text-black">Your Wishlist is Empty</h2>
          <p className="text-sm text-black/60">
            Save items you love by tapping the heart icon on any product card while browsing!
          </p>
        </div>
        <div>
          <Link
            href="/shop"
            className="inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white transition hover:bg-black/90 shadow-md"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-black/60 text-sm">{wishlist.length} saved items</p>
        <button
          type="button"
          onClick={clearWishlist}
          className="text-xs font-semibold text-black/60 hover:text-red-600 transition cursor-pointer"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wishlist.map((item) => (
          <article key={item.id} className="group relative flex flex-col space-y-3.5 border border-black/10 rounded-[20px] p-3 bg-white">
            <div className="relative aspect-[295/298] w-full overflow-hidden rounded-[16px] bg-[#f0eeed]">
              <Link href={`/product/${item.id}`} className="absolute inset-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  sizes="250px"
                  className="object-contain p-4 transition duration-300 group-hover:scale-105"
                />
              </Link>
              <button
                type="button"
                onClick={() => removeFromWishlist(item.id)}
                aria-label="Remove from wishlist"
                className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-white/90 shadow-xs text-red-500 hover:scale-110 transition cursor-pointer"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="flex-1 space-y-2">
              <Link href={`/product/${item.id}`}>
                <h3 className="text-base font-bold leading-snug text-black line-clamp-1 hover:underline">
                  {item.name}
                </h3>
              </Link>
              <RatingStars rating={item.rating || 4.5} />
              <PriceBlock price={item.price} originalPrice={item.originalPrice} discount={item.discount} />
            </div>

            <button
              type="button"
              onClick={() =>
                addToCart({
                  productId: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: 1,
                  image: item.image,
                })
              }
              className="w-full h-11 rounded-full bg-black text-white text-xs font-bold transition hover:bg-black/90 cursor-pointer shadow-xs"
            >
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

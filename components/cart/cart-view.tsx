"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Minus, Plus, ShoppingBag, Tag, Trash2, X } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { CheckoutDialog } from "@/components/cart/checkout-dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function CartView() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    discountAmount,
    deliveryFee,
    cartTotal,
    promoCode,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    if (res.success) {
      setInputCode("");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-6 max-w-md mx-auto">
        <div className="flex justify-center">
          <div className="rounded-full bg-[#F0F0F0] p-8">
            <ShoppingBag className="size-16 text-black/40" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-heading text-black">Your Cart is Empty</h2>
          <p className="text-sm text-black/60">
            Looks like you haven&apos;t added any clothes yet. Explore our curated collections to find pieces that match your style!
          </p>
        </div>
        <div>
          <Link
            href="/shop"
            className="inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white transition hover:bg-black/90 shadow-md"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_505px] items-start">
      {/* Left Card: List of Cart Items */}
      <div className="rounded-[20px] border border-black/10 p-4 sm:p-6 divide-y divide-black/10 bg-white">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-4 py-5 first:pt-0 last:pb-0 items-center">
            {/* Product Thumbnail */}
            <div className="relative aspect-square size-[99px] sm:size-[124px] shrink-0 overflow-hidden rounded-[16px] bg-[#E2E2E2]">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                sizes="124px"
                className="object-cover"
              />
            </div>

            {/* Item Details */}
            <div className="flex flex-1 flex-col justify-between self-stretch py-0.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Link href={`/product/${item.productId}`} className="hover:underline">
                    <h3 className="text-base sm:text-lg font-bold text-black line-clamp-1">{item.name}</h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-black/60 mt-0.5">
                    Size: <span className="text-black font-medium">{item.size || "Standard"}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-black/60">
                    Color: <span className="text-black font-medium">{item.color || "Default"}</span>
                  </p>
                </div>

                {/* Remove Trash Button */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="text-[#ff3333] hover:opacity-80 p-1.5 rounded-full hover:bg-red-50 transition cursor-pointer"
                >
                  <Trash2 className="size-5" />
                </button>
              </div>

              {/* Price & Quantity Stepper */}
              <div className="flex items-end justify-between pt-2">
                <span className="text-xl sm:text-2xl font-bold text-black">${item.price.toFixed(0)}</span>

                <div className="flex h-9 sm:h-10 items-center justify-between rounded-full bg-[#F0F0F0] px-3 sm:px-4 w-[100px] sm:w-[120px]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-black/60 hover:text-black transition cursor-pointer p-0.5"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="text-sm font-bold text-black">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-black/60 hover:text-black transition cursor-pointer p-0.5"
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Card: Order Summary */}
      <div className="rounded-[20px] border border-black/10 p-5 sm:p-6 space-y-6 bg-white sticky top-24">
        <h2 className="text-xl sm:text-2xl font-bold text-black">Order Summary</h2>

        <div className="space-y-4 text-base sm:text-lg">
          <div className="flex justify-between text-black/60">
            <span>Subtotal</span>
            <span className="font-bold text-black">${cartSubtotal.toFixed(0)}</span>
          </div>

          <div className="flex justify-between text-black/60">
            <span>Discount {promoCode ? `(${promoCode})` : "(-20%)"}</span>
            <span className="font-bold text-[#ff3333]">
              {discountAmount > 0 ? `-$${discountAmount.toFixed(0)}` : "$0"}
            </span>
          </div>

          <div className="flex justify-between text-black/60">
            <span>Delivery Fee</span>
            <span className="font-bold text-black">{deliveryFee === 0 ? "FREE" : `$${deliveryFee}`}</span>
          </div>

          <Separator className="bg-black/10 my-2" />

          <div className="flex justify-between text-lg sm:text-xl font-bold text-black">
            <span>Total</span>
            <span>${cartTotal.toFixed(0)}</span>
          </div>
        </div>

        {/* Promo Code Form */}
        <div className="space-y-2">
          {promoCode ? (
            <div className="flex items-center justify-between rounded-full bg-green-50 border border-green-200 px-4 py-2.5 text-sm text-green-800">
              <div className="flex items-center gap-2">
                <Tag className="size-4 text-green-600" />
                <span>Code <strong>{promoCode}</strong> applied</span>
              </div>
              <button
                type="button"
                onClick={removePromoCode}
                className="text-green-700 hover:text-green-900 cursor-pointer"
                aria-label="Remove promo code"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyPromo} className="flex gap-3">
              <div className="relative flex-1">
                <Tag className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-black/40" />
                <Input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Add promo code (e.g. SAVE20)"
                  className="h-12 rounded-full border-0 bg-[#F0F0F0] pl-12 pr-4 text-sm shadow-none placeholder:text-black/40"
                />
              </div>
              <button
                type="submit"
                className="h-12 rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/90 cursor-pointer shrink-0"
              >
                Apply
              </button>
            </form>
          )}
        </div>

        {/* Checkout Modal Button */}
        <CheckoutDialog />
      </div>
    </div>
  );
}

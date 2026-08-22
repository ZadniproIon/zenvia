"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import { useCart } from "./cart-provider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "./ui/sheet";
import { Button } from "./ui/button";
import { CheckoutDialog } from "./cart/checkout-dialog";
import { Separator } from "./ui/separator";

export function CartSheet() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <button type="button" className="relative rounded-full p-2 text-black hover:bg-black/5 transition cursor-pointer" aria-label="View cart">
            <ShoppingCart className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center animate-in zoom-in-50">
                {cartCount}
              </span>
            )}
          </button>
        }
      />
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-6 bg-white">
        <SheetHeader className="text-left">
          <SheetTitle className="font-heading text-xl font-bold">Shopping Cart ({cartCount})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-3 text-black/50 text-center">
              <ShoppingCart className="h-12 w-12 opacity-20" />
              <p className="text-sm font-medium">Your cart is empty.</p>
              <Link
                href="/shop"
                className="inline-flex h-9 items-center justify-center rounded-full bg-black px-4 text-xs font-semibold text-white hover:bg-black/90 transition"
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-black/10">
              {cart.map((item) => (
                <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex gap-3.5 items-center">
                  <div className="relative size-16 rounded-xl overflow-hidden shrink-0 bg-[#E2E2E2] border border-black/5">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-black truncate">{item.name}</h4>
                    <p className="text-xs text-black/50">
                      {item.size || "M"} • {item.color || "Default"}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        className="size-6 rounded-md border border-black/15 flex items-center justify-center text-black/60 hover:text-black hover:border-black cursor-pointer transition"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        className="size-6 rounded-md border border-black/15 flex items-center justify-center text-black/60 hover:text-black hover:border-black cursor-pointer transition"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between self-stretch py-0.5">
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 p-1 transition cursor-pointer"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                    <span className="font-extrabold text-sm text-black">
                      ${(item.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-black/10">
            <div className="flex items-center justify-between text-base font-extrabold text-black">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/cart"
                className="inline-flex h-11 items-center justify-center rounded-full border border-black/20 text-xs font-bold text-black hover:bg-black/5 transition"
              >
                View Full Cart
              </Link>
              <CheckoutDialog
                trigger={
                  <button
                    type="button"
                    className="inline-flex h-11 w-full items-center justify-center rounded-full bg-black text-xs font-bold text-white hover:bg-black/90 transition shadow-xs cursor-pointer"
                  >
                    Quick Checkout
                  </button>
                }
              />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

"use client";

import { useTransition } from "react";
import { useCart } from "./cart-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import { checkout } from "@/app/actions";
import { Separator } from "./ui/separator";

export function CartSheet() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    startTransition(async () => {
      const items = cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));
      
      const result = await checkout(items);
      
      if (result.success) {
        clearCart();
        alert(`Checkout successful! Order ID: ${result.orderId}`);
      } else {
        alert(result.error || "Checkout failed");
      }
    });
  };

  return (
    <Sheet>
      <SheetTrigger 
        render={
          <button type="button" className="rounded-full p-1.5 text-black relative" aria-label="View cart">
            <ShoppingCart className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        }
      />
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 opacity-20" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.productId} className="flex gap-4 items-center">
                  <div className="relative h-20 w-20 rounded overflow-hidden flex-shrink-0 bg-muted">
                    <Image
                      src={item.image || "https://placehold.co/150"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium line-clamp-1">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-4 pt-4">
          <Separator />
          <div className="flex items-center justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <SheetFooter>
            <Button
              className="w-full"
              size="lg"
              onClick={handleCheckout}
              disabled={cart.length === 0 || isPending}
            >
              {isPending ? "Processing..." : "Checkout"}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string; // composite key: `${productId}-${size}-${color}`
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id"> & { id?: string }) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotal: number;
  cartCount: number;
  deliveryFee: number;
  promoCode: string | null;
  discountAmount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
}

const VALID_PROMOS: Record<string, { discountPercent: number; description: string }> = {
  SAVE20: { discountPercent: 20, description: "20% off entire order" },
  ZENVIA10: { discountPercent: 10, description: "10% off entire order" },
  FREESHIP: { discountPercent: 0, description: "Free delivery" },
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("zenvia_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedPromo = localStorage.getItem("zenvia_promo");
      if (savedPromo) {
        setPromoCode(savedPromo);
      }
    } catch (e) {
      console.error("Failed to parse cart from local storage", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("zenvia_cart", JSON.stringify(cart));
        if (promoCode) {
          localStorage.setItem("zenvia_promo", promoCode);
        } else {
          localStorage.removeItem("zenvia_promo");
        }
      } catch (e) {
        console.error("Failed to save cart to local storage", e);
      }
    }
  }, [cart, promoCode, isLoaded]);

  const addToCart = (itemData: Omit<CartItem, "id"> & { id?: string }) => {
    const size = itemData.size || "Default";
    const color = itemData.color || "Default";
    const itemId = itemData.id || `${itemData.productId}-${size}-${color}`;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((i) => i.id === itemId);
      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += itemData.quantity;
        return newCart;
      }
      return [...prevCart, { ...itemData, id: itemId, size, color }];
    });

    const sizeColorDetails = [itemData.size, itemData.color].filter(Boolean).join(" / ");
    toast.success(
      `Added "${itemData.name}"${sizeColorDetails ? ` (${sizeColorDetails})` : ""} to your cart!`
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === itemId);
      if (item) {
        toast.info(`Removed "${item.name}" from your cart.`);
      }
      return prevCart.filter((i) => i.id !== itemId);
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode(null);
  };

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    if (VALID_PROMOS[clean]) {
      setPromoCode(clean);
      toast.success(`Promo code ${clean} applied: ${VALID_PROMOS[clean].description}`);
      return { success: true, message: `Applied ${clean}!` };
    }
    toast.error("Invalid promo code. Try SAVE20 or ZENVIA10");
    return { success: false, message: "Invalid promo code" };
  };

  const removePromoCode = () => {
    setPromoCode(null);
    toast.info("Promo code removed.");
  };

  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Delivery fee is $15 unless subtotal > $200 or promo FREESHIP
  let deliveryFee = cartSubtotal > 0 ? (cartSubtotal > 200 || promoCode === "FREESHIP" ? 0 : 15) : 0;

  // Discount amount
  let discountAmount = 0;
  if (promoCode && VALID_PROMOS[promoCode]) {
    const rate = VALID_PROMOS[promoCode].discountPercent / 100;
    discountAmount = Math.round(cartSubtotal * rate * 100) / 100;
  }

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartTotal,
        cartCount,
        deliveryFee,
        promoCode,
        discountAmount,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

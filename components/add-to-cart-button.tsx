"use client";

import { useCart } from "./cart-provider";
import { Button } from "./ui/button";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button
      size="lg"
      className="flex-1 text-base font-semibold"
      disabled={product.stock <= 0}
      onClick={() => {
        addToCart({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        });
      }}
    >
      Add to Cart
    </Button>
  );
}

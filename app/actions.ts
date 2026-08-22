"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type CheckoutPayload = {
  items: {
    productId: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
    name?: string;
    image?: string;
  }[];
  shippingName: string;
  shippingEmail: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostal: string;
  shippingCountry: string;
  paymentMethod: string;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  totalAmount: number;
  promoCode?: string;
};

export async function processOrder(payload: CheckoutPayload) {
  if (!payload.items || payload.items.length === 0) {
    return { success: false, error: "Your cart is empty" };
  }

  try {
    let user = await prisma.user.findUnique({
      where: { email: payload.shippingEmail || "admin@zenvia.com" },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: payload.shippingEmail || `customer-${Date.now()}@zenvia.com`,
          password: "customer_guest_pass",
          name: payload.shippingName || "Guest Customer",
          role: "USER",
        },
      });
    }

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: "PAID",
        totalAmount: payload.totalAmount,
        subtotal: payload.subtotal,
        discountAmount: payload.discountAmount,
        deliveryFee: payload.deliveryFee,
        promoCode: payload.promoCode,
        shippingName: payload.shippingName,
        shippingEmail: payload.shippingEmail,
        shippingAddress: payload.shippingAddress,
        shippingCity: payload.shippingCity,
        shippingPostal: payload.shippingPostal,
        shippingCountry: payload.shippingCountry,
        paymentMethod: payload.paymentMethod,
        orderItems: {
          create: payload.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            size: item.size || "Standard",
            color: item.color || "Default",
            name: item.name,
            image: item.image,
          })),
        },
      },
    });

    // Reduce stock for ordered items
    for (const item of payload.items) {
      try {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      } catch (e) {
        console.warn(`Could not decrement stock for product ${item.productId}`, e);
      }
    }

    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order processing failed:", error);
    return { success: false, error: "Failed to place order. Please try again." };
  }
}

// Backward compatibility alias for existing calls
export async function checkout(cartItems: { productId: string; quantity: number; price: number; size?: string; color?: string; name?: string; image?: string }[]) {
  const totalAmount = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return processOrder({
    items: cartItems,
    shippingName: "Sarah Miller",
    shippingEmail: "sarah.miller@example.com",
    shippingAddress: "123 Fashion Blvd",
    shippingCity: "New York",
    shippingPostal: "10001",
    shippingCountry: "United States",
    paymentMethod: "Credit Card",
    subtotal: totalAmount,
    discountAmount: 0,
    deliveryFee: 15,
    totalAmount: totalAmount + 15,
  });
}

export async function addReview(data: {
  productId: string;
  userName: string;
  rating: number;
  comment: string;
}) {
  if (!data.productId || !data.userName || !data.comment) {
    return { success: false, error: "All fields are required." };
  }

  try {
    const review = await prisma.review.create({
      data: {
        productId: data.productId,
        userName: data.userName.trim(),
        rating: Math.min(5, Math.max(1, data.rating)),
        comment: data.comment.trim(),
        verified: true,
      },
    });

    // Recalculate average rating
    const allReviews = await prisma.review.findMany({
      where: { productId: data.productId },
      select: { rating: true },
    });

    const avg = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
    const roundedRating = Math.round(avg * 10) / 10;

    await prisma.product.update({
      where: { id: data.productId },
      data: {
        rating: roundedRating,
        reviewCount: allReviews.length,
      },
    });

    revalidatePath(`/product/${data.productId}`);
    revalidatePath("/shop");
    revalidatePath("/");
    return { success: true, review };
  } catch (error) {
    console.error("Add review failed:", error);
    return { success: false, error: "Failed to submit review." };
  }
}

export async function createProduct(formData: {
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  discount?: string | null;
  image: string;
  stock: number;
  categoryId: string;
  dressStyle: string;
  isNewArrival?: boolean;
  isTopSelling?: boolean;
}) {
  try {
    const product = await prisma.product.create({
      data: {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        originalPrice: formData.originalPrice || null,
        discount: formData.discount || null,
        image: formData.image || "/figma-product/product-main.png",
        galleryImages: JSON.stringify([formData.image || "/figma-product/product-main.png"]),
        stock: formData.stock,
        categoryId: formData.categoryId,
        dressStyle: formData.dressStyle || "Casual",
        isNewArrival: formData.isNewArrival || false,
        isTopSelling: formData.isTopSelling || false,
        rating: 5.0,
        reviewCount: 0,
      },
    });

    revalidatePath("/shop");
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true, product };
  } catch (error) {
    console.error("Create product failed:", error);
    return { success: false, error: "Failed to create product." };
  }
}

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: number;
    originalPrice?: number | null;
    discount?: string | null;
    stock?: number;
    categoryId?: string;
    dressStyle?: string;
    image?: string;
  }
) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data,
    });

    revalidatePath("/shop");
    revalidatePath(`/product/${id}`);
    revalidatePath("/admin/products");
    return { success: true, product };
  } catch (error) {
    console.error("Update product failed:", error);
    return { success: false, error: "Failed to update product." };
  }
}

export async function deleteProduct(productId: string) {
  try {
    await prisma.product.delete({
      where: { id: productId },
    });

    revalidatePath("/shop");
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete product failed:", error);
    return { success: false, error: "Failed to delete product." };
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: true, order };
  } catch (error) {
    console.error("Update order status failed:", error);
    return { success: false, error: "Failed to update order status." };
  }
}

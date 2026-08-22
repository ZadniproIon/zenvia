"use server";

import prisma from "@/lib/prisma";

export async function checkout(cartItems: { productId: string; quantity: number; price: number }[]) {
  if (!cartItems || cartItems.length === 0) {
    return { success: false, error: "Cart is empty" };
  }

  try {
    // For now, simulate a logged-in user by fetching the admin
    // Or just fetch the first user, or hardcode
    let user = await prisma.user.findUnique({
      where: { email: "admin@zenvia.com" },
    });

    // If user doesn't exist, create a dummy one for checkout to work
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: "admin@zenvia.com",
          password: "dummy_password", // Do not use this in real production auth
          name: "Admin User",
          role: "ADMIN"
        },
      });
    }

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount,
        status: "PENDING",
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Checkout failed:", error);
    return { success: false, error: "Checkout failed" };
  }
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronRight, Package, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { Metadata } from "next";

import prisma from "@/lib/prisma";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { containerClass } from "@/components/site/constants";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Order Confirmed | ZENVIA",
  description: "Thank you for your order with Zenvia.",
};

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  // Calculate estimated delivery: 4 days from order creation
  const orderDate = new Date(order.createdAt);
  const estDelivery = new Date(orderDate);
  estDelivery.setDate(orderDate.getDate() + 4);

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-black">
      <SiteHeader />

      <main className={`${containerClass} py-10 sm:py-16`}>
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Success Banner Card */}
          <div className="rounded-3xl bg-white p-8 sm:p-10 border border-black/10 text-center space-y-4 shadow-sm">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <CheckCircle2 className="size-16" />
              </div>
            </div>
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-green-600">
                Payment Successful
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-black">
                Thank You For Your Order!
              </h1>
              <p className="text-sm sm:text-base text-black/60 max-w-lg mx-auto">
                We have received your order and are preparing it for shipment. A confirmation email has been sent to{" "}
                <strong className="text-black">{order.shippingEmail || "your email"}</strong>.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-black/60 font-medium">
              <span className="bg-[#F0F0F0] px-4 py-2 rounded-full">
                Order ID: <strong className="text-black">{order.id}</strong>
              </span>
              <span className="bg-[#F0F0F0] px-4 py-2 rounded-full">
                Date: <strong className="text-black">{orderDate.toLocaleDateString()}</strong>
              </span>
            </div>
          </div>

          {/* Delivery Timeline Progress */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 border border-black/10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <Truck className="size-5 text-black" />
                <h3 className="font-bold text-lg text-black">Estimated Delivery</h3>
              </div>
              <span className="text-sm font-semibold text-black bg-black/5 px-3 py-1 rounded-full">
                {estDelivery.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="space-y-1">
                <div className="h-2 rounded-full bg-green-500" />
                <span className="font-bold text-black">Confirmed</span>
              </div>
              <div className="space-y-1">
                <div className="h-2 rounded-full bg-black" />
                <span className="font-bold text-black">Processing</span>
              </div>
              <div className="space-y-1">
                <div className="h-2 rounded-full bg-black/15" />
                <span className="text-black/50">Shipped</span>
              </div>
              <div className="space-y-1">
                <div className="h-2 rounded-full bg-black/15" />
                <span className="text-black/50">Delivered</span>
              </div>
            </div>
          </div>

          {/* Order Details & Summary Breakdown */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 border border-black/10 shadow-sm space-y-6">
            <h3 className="font-bold text-xl text-black">Order Summary</h3>

            {/* Items List */}
            <div className="divide-y divide-black/10">
              {order.orderItems.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative size-16 rounded-xl bg-[#F0EEED] p-1 shrink-0 overflow-hidden">
                      <Image
                        src={item.image || item.product?.image || "/placeholder.svg"}
                        alt={item.name || item.product?.name || "Product"}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-black">{item.name || item.product?.name}</h4>
                      <p className="text-xs text-black/60">
                        Size: {item.size || "Standard"} • Color: {item.color || "Default"} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-sm sm:text-base text-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="bg-black/10" />

            {/* Totals Table */}
            <div className="space-y-2 text-sm text-black/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-black">${(order.subtotal || order.totalAmount).toFixed(2)}</span>
              </div>
              {order.discountAmount && order.discountAmount > 0 ? (
                <div className="flex justify-between text-[#ff3333]">
                  <span>Discount {order.promoCode ? `(${order.promoCode})` : ""}</span>
                  <span className="font-semibold">-${order.discountAmount.toFixed(2)}</span>
                </div>
              ) : null}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-semibold text-black">
                  {order.deliveryFee === 0 ? "FREE" : `$${order.deliveryFee?.toFixed(2) || "15.00"}`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-extrabold text-black pt-2 border-t border-black/10">
                <span>Total Paid</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="bg-black/10" />

            {/* Shipping & Payment Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-black/70 bg-[#F9F9F9] p-4 rounded-2xl">
              <div>
                <span className="font-bold text-black block mb-1">Shipping Address:</span>
                <p>{order.shippingName}</p>
                <p>{order.shippingAddress}</p>
                <p>
                  {order.shippingCity}, {order.shippingPostal} {order.shippingCountry}
                </p>
              </div>
              <div>
                <span className="font-bold text-black block mb-1">Payment Details:</span>
                <p>Method: {order.paymentMethod || "Credit Card"}</p>
                <p>Status: <strong className="text-green-600 font-semibold">{order.status}</strong></p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/shop"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-black px-8 text-base font-medium text-white transition hover:bg-black/90 shadow-md"
            >
              <ShoppingBag className="size-5" />
              <span>Continue Shopping</span>
            </Link>

            <Link
              href="/admin/orders"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-8 text-base font-medium text-black transition hover:bg-black/5 shadow-xs"
            >
              <span>View in Admin Dashboard</span>
              <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

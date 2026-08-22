import Link from "next/link";
import prisma from "@/lib/prisma";
import { OrderStatusSelect } from "@/components/admin/order-status-select";
import { ExternalLink, Package } from "lucide-react";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-heading">Orders Management</h1>
        <p className="text-sm text-gray-500 mt-1">Track and manage customer shipments and payment status</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-600 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Order ID & Date</th>
                <th className="px-6 py-4">Customer & Shipping</th>
                <th className="px-6 py-4">Ordered Items</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Status Workflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-6 py-4">
                    <Link
                      href={`/order/success/${order.id}`}
                      target="_blank"
                      className="font-bold text-gray-900 hover:text-blue-600 flex items-center gap-1"
                    >
                      <span>#{order.id.slice(0, 8)}</span>
                      <ExternalLink className="size-3 text-gray-400" />
                    </Link>
                    <span className="text-xs text-gray-500 block mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{order.shippingName || order.user?.name || "Guest Customer"}</div>
                    <div className="text-xs text-gray-500">{order.shippingEmail || order.user?.email}</div>
                    {order.shippingAddress && (
                      <div className="text-xs text-gray-400 mt-0.5">
                        {order.shippingCity}, {order.shippingCountry}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="text-xs text-gray-700">
                          <strong>{item.quantity}x</strong> {item.name || item.product?.name}{" "}
                          <span className="text-gray-400">
                            ({item.size || "M"} / {item.color || "Default"})
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-extrabold text-gray-900 text-base">${order.totalAmount.toFixed(2)}</span>
                    {order.promoCode && (
                      <span className="block text-[10px] text-green-700 font-semibold uppercase">
                        Promo: {order.promoCode}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Package className="size-10 mx-auto text-gray-300 mb-2" />
                    No customer orders placed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

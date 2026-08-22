import Link from "next/link";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, DollarSign, Package, ShoppingBag, ShoppingCart, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  const [productsCount, ordersCount, orders, recentOrders, topProducts] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.findMany({
      select: { totalAmount: true },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { orderItems: true },
    }),
    prisma.product.findMany({
      where: { isTopSelling: true },
      take: 5,
      orderBy: { rating: "desc" },
    }),
  ]);

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const avgOrderValue = ordersCount > 0 ? totalRevenue / ordersCount : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 font-heading">Store Analytics & Dashboard</h1>
          <p className="text-sm text-gray-500">Real-time performance metrics powered by PostgreSQL</p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-3.5 py-2 rounded-xl hover:bg-gray-50 transition shadow-2xs"
        >
          <span>View Public Store</span>
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-gray-200 shadow-xs bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Revenue</CardTitle>
            <div className="rounded-full bg-green-100 p-2 text-green-700">
              <DollarSign className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-gray-900">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-gray-400 mt-1">From {ordersCount} processed orders</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-gray-200 shadow-xs bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Orders</CardTitle>
            <div className="rounded-full bg-blue-100 p-2 text-blue-700">
              <ShoppingCart className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-gray-900">{ordersCount}</div>
            <p className="text-xs text-gray-400 mt-1">Lifetime customer purchases</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-gray-200 shadow-xs bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-gray-500">Avg. Order Value</CardTitle>
            <div className="rounded-full bg-amber-100 p-2 text-amber-700">
              <TrendingUp className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-gray-900">${avgOrderValue.toFixed(2)}</div>
            <p className="text-xs text-gray-400 mt-1">Average basket size</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-gray-200 shadow-xs bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-gray-500">Active Inventory</CardTitle>
            <div className="rounded-full bg-purple-100 p-2 text-purple-700">
              <Package className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-gray-900">{productsCount}</div>
            <p className="text-xs text-gray-400 mt-1">Products across 5 categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout: Recent Orders & Top Selling Products */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Customer Orders</h2>
            <Link href="/admin/orders" className="text-xs font-semibold text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {recentOrders.map((ord) => (
              <div key={ord.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-gray-900 block">
                    {ord.shippingName || "Customer"} (#{ord.id.slice(0, 6)})
                  </span>
                  <span className="text-xs text-gray-400">
                    {ord.orderItems.length} items • {new Date(ord.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 block">${ord.totalAmount.toFixed(2)}</span>
                  <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
            {recentOrders.length === 0 && (
              <div className="py-8 text-center text-xs text-gray-400">No recent orders.</div>
            )}
          </div>
        </div>

        {/* Top Products Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Top Performing Products</h2>
            <Link href="/admin/products" className="text-xs font-semibold text-blue-600 hover:underline">
              View Inventory
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {topProducts.map((prod) => (
              <div key={prod.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-gray-900 block line-clamp-1">{prod.name}</span>
                  <span className="text-xs text-gray-400">
                    {prod.rating} ★ ({prod.stock} in stock)
                  </span>
                </div>
                <span className="font-bold text-gray-900">${prod.price.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

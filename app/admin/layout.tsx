import Link from "next/link";
import { ArrowLeft, LayoutDashboard, LogOut, Package, ShoppingCart, Store } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50/70 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col justify-between">
        <div>
          {/* Logo & Brand Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
            <Link href="/admin" className="font-heading font-extrabold text-xl uppercase tracking-wider text-black">
              Zenvia <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full ml-1 lowercase font-normal">admin</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-xl hover:bg-gray-100 text-gray-900 transition"
            >
              <LayoutDashboard className="size-4.5 text-gray-500" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-xl hover:bg-gray-100 text-gray-900 transition"
            >
              <Package className="size-4.5 text-gray-500" />
              <span>Products</span>
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-xl hover:bg-gray-100 text-gray-900 transition"
            >
              <ShoppingCart className="size-4.5 text-gray-500" />
              <span>Orders</span>
            </Link>
          </nav>
        </div>

        {/* Footer / Account */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black transition"
          >
            <Store className="size-4 text-gray-500" />
            <span>Go to Storefront</span>
          </Link>
          <div className="px-3 py-2 bg-gray-50 rounded-xl text-xs text-gray-500">
            Logged in as <strong className="text-gray-900 block">{session.user?.email}</strong>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 sm:p-10 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

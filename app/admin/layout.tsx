import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react';

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b">
          <span className="font-bold text-lg">Admin Panel</span>
        </div>
        <nav className="p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-900">
            <LayoutDashboard className="h-5 w-5 text-gray-500" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-900">
            <Package className="h-5 w-5 text-gray-500" />
            Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-900">
            <ShoppingCart className="h-5 w-5 text-gray-500" />
            Orders
          </Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

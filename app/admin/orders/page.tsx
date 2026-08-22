import prisma from '@/lib/prisma';
import { Badge } from '@/components/ui/badge';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>
      
      <div className="bg-white rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Total Amount</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">{order.user?.name || order.user?.email || 'Unknown'}</td>
                  <td className="px-6 py-4">
                    <Badge variant={order.status === 'COMPLETED' ? 'default' : 'secondary'}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No orders found.
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

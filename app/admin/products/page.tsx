import prisma from '@/lib/prisma';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Products</h1>
      
      <div className="bg-white rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4">{product.category.name}</td>
                  <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No products found.
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

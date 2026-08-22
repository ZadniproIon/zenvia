import { containerClass } from "@/components/site/constants";

export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-16 border-b border-gray-100 animate-pulse bg-gray-50" />
      <div className={`${containerClass} py-8`}>
        <div className="h-6 w-32 rounded bg-gray-100 animate-pulse mb-8" />
        <div className="grid gap-8 lg:grid-cols-[295px_minmax(0,1fr)]">
          <div className="hidden lg:block h-[500px] rounded-3xl bg-gray-100 animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square rounded-2xl bg-gray-100 animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-gray-100 animate-pulse" />
                <div className="h-4 w-1/3 rounded bg-gray-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

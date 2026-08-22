import { containerClass } from "@/components/site/constants";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-16 border-b border-gray-100 animate-pulse bg-gray-50" />
      <div className={`${containerClass} py-12 space-y-10`}>
        <div className="h-64 rounded-3xl bg-gray-100 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square rounded-2xl bg-gray-100 animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-gray-100 animate-pulse" />
              <div className="h-4 w-1/2 rounded bg-gray-100 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

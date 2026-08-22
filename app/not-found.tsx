import Link from "next/link";
import { ArrowLeft, Compass, ShoppingBag } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { containerClass } from "@/components/site/constants";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between">
      <SiteHeader />

      <main className={`${containerClass} py-24 text-center space-y-6 max-w-lg mx-auto`}>
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#F0F0F0] text-black">
          <Compass className="size-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-black/40">404 Error</span>
          <h1 className="text-4xl font-extrabold font-heading text-black">Page Not Found</h1>
          <p className="text-sm text-black/60">
            The page or product you are looking for might have been moved, removed, or never existed.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 px-6 text-sm font-medium text-black hover:bg-black/5 transition"
          >
            <ArrowLeft className="size-4" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            href="/shop"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 transition shadow-md"
          >
            <ShoppingBag className="size-4" />
            <span>Browse Shop</span>
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

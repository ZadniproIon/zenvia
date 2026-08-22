import Link from "next/link";
import { Metadata } from "next";

import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { containerClass } from "@/components/site/constants";
import { WishlistView } from "@/components/wishlist/wishlist-view";

export const metadata: Metadata = {
  title: "Your Wishlist | ZENVIA",
  description: "View and manage your saved favorite clothing items.",
};

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader />

      <main className={`${containerClass} pt-6 pb-20 sm:pt-8`}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2.5 text-sm text-black/60 sm:text-base pb-6">
          <Link href="/" className="transition hover:text-black">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-black">Wishlist</span>
        </nav>

        <h1 className="font-heading text-[34px] font-extrabold uppercase leading-none tracking-[-0.04em] text-black sm:text-[40px] mb-8">
          Your Saved Items
        </h1>

        <WishlistView />
      </main>

      <SiteFooter />
    </div>
  );
}

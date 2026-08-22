"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, CircleUserRound, Heart, Menu, Search, ShoppingCart, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { containerClass, navLinks, quickLinks } from "@/components/site/constants";
import { useCart } from "@/components/cart-provider";
import { useWishlist } from "@/components/wishlist-provider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function SiteHeader() {
  const router = useRouter();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [promoBarVisible, setPromoBarVisible] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="border-b border-transparent sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all shadow-xs">
      {promoBarVisible && (
        <div className="bg-black text-white">
          <div className={`${containerClass} relative flex min-h-[38px] items-center justify-center py-2`}>
            <p className="text-center text-xs leading-normal sm:text-sm font-medium">
              Sign up and get 20% off with promo code <span className="font-bold underline">SAVE20</span> on your first order.{" "}
              <Link href="/shop" className="font-semibold underline underline-offset-2 hover:text-white/80 ml-1">
                Shop Now
              </Link>
            </p>
            <button
              type="button"
              onClick={() => setPromoBarVisible(false)}
              aria-label="Dismiss promotion bar"
              className="absolute right-4 hidden text-white/80 transition hover:text-white lg:block cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <div className={`${containerClass} py-4 lg:py-5`}>
        <div className="flex items-center gap-3 lg:gap-8">
          {/* Mobile Menu Drawer */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger
                render={
                  <button type="button" className="rounded-full p-2 text-black cursor-pointer hover:bg-black/5" aria-label="Open navigation menu">
                    <Menu className="size-6" />
                  </button>
                }
              />
              <SheetContent side="left" className="w-[300px] sm:w-[350px] p-6 flex flex-col justify-between">
                <div>
                  <SheetHeader className="mb-6 text-left">
                    <SheetTitle className="font-heading text-2xl font-extrabold uppercase">Zenvia</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <div key={link.label} className="space-y-2">
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-lg font-bold text-black hover:text-black/70 flex items-center justify-between"
                        >
                          <span>{link.label}</span>
                        </Link>
                        {link.subItems && (
                          <div className="pl-4 flex flex-col gap-2 border-l border-black/10">
                            {link.subItems.map((sub) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-sm text-black/70 hover:text-black"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="pt-4 border-t border-black/10 flex flex-col gap-2">
                      {quickLinks.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm font-medium text-black/70 hover:text-black py-1"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
                <div className="pt-6 border-t border-black/10 text-xs text-black/50">
                  © 2026 Zenvia Storefront
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="font-heading text-[28px] font-extrabold uppercase tracking-[-0.05em] sm:text-[32px] hover:opacity-90 transition">
            Zenvia
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-base text-black transition hover:text-black/70 py-2"
                >
                  <span>{link.label}</span>
                  {link.hasChevron ? <ChevronDown className="size-4 group-hover:rotate-180 transition duration-200" /> : null}
                </Link>
                {link.subItems && (
                  <div className="absolute left-0 top-full hidden group-hover:block z-50 min-w-[200px] rounded-2xl border border-black/10 bg-white p-2 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
                    {link.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block rounded-xl px-3 py-2 text-sm text-black/80 transition hover:bg-black hover:text-white"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link href="/admin" className="text-sm font-semibold text-black/60 hover:text-black px-2 py-1 rounded-md bg-black/5 hover:bg-black/10 transition">
              Admin
            </Link>
          </nav>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="relative hidden flex-1 lg:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-black/40" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for clothes, jeans, shirts..."
              className="h-12 rounded-full border-0 bg-[#f0f0f0] pl-12 pr-4 text-base shadow-none placeholder:text-black/40 focus-visible:ring-1 focus-visible:ring-black/20"
            />
          </form>

          {/* Right Icons: Search Mobile, Wishlist, Cart, User */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3.5 lg:ml-0">
            <Link
              href="/wishlist"
              className="relative rounded-full p-2 text-black hover:bg-black/5 transition"
              aria-label="View Wishlist"
            >
              <Heart className="size-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center animate-in zoom-in-50">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative rounded-full p-2 text-black hover:bg-black/5 transition"
              aria-label="View shopping cart"
            >
              <ShoppingCart className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center animate-in zoom-in-50">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/login"
              className="rounded-full p-2 text-black hover:bg-black/5 transition"
              aria-label="Account login"
            >
              <CircleUserRound className="size-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className="pt-3 lg:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-black/40" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for clothes, jeans..."
              className="h-11 rounded-full border-0 bg-[#f0f0f0] pl-12 text-sm shadow-none placeholder:text-black/40 focus-visible:ring-1 focus-visible:ring-black/20"
            />
          </div>
        </form>
      </div>
    </header>
  );
}

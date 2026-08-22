import Link from "next/link";
import { ChevronDown, CircleUserRound, Menu, Search, ShoppingCart, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { containerClass, devLinks, navLinks } from "@/components/site/constants";
import { CartSheet } from "@/components/cart-sheet";

export function SiteHeader() {
  return (
    <header className="border-b border-transparent">
      <div className="bg-black text-white">
        <div className={`${containerClass} relative flex min-h-[38px] items-center justify-center py-2`}>
          <p className="text-center text-xs leading-normal sm:text-sm">
            Sign up and get 20% off to your first order.{" "}
            <Link href="#" className="font-medium underline underline-offset-2">
              Sign Up Now
            </Link>
          </p>
          <button
            type="button"
            aria-label="Dismiss promotion bar"
            className="absolute right-4 hidden text-white/80 transition hover:text-white lg:block"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      <div className={`${containerClass} py-5 lg:py-6`}>
        <div className="flex items-center gap-3 lg:gap-10">
          <button type="button" className="rounded-full p-2 text-black lg:hidden" aria-label="Open navigation menu">
            <Menu className="size-6" />
          </button>

          <Link href="/" className="font-heading text-[28px] font-extrabold uppercase tracking-[-0.05em] sm:text-[32px]">
            Zenvia
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-1 text-base text-black transition hover:text-black/70"
              >
                <span>{link.label}</span>
                {link.hasChevron ? <ChevronDown className="size-4" /> : null}
              </Link>
            ))}

            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 text-base text-black transition hover:text-black/70">
                <span>Dev</span>
                <ChevronDown className="size-4 transition group-open:rotate-180" />
              </summary>
              <div className="absolute left-0 top-full z-20 mt-3 min-w-[180px] rounded-2xl border border-black/10 bg-white p-2 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
                {devLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-3 py-2 text-sm text-black/80 transition hover:bg-black hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>
          </nav>

          <div className="relative hidden flex-1 lg:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-black/40" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="h-12 rounded-full border-0 bg-[#f0f0f0] pl-12 text-base shadow-none placeholder:text-black/40 focus-visible:ring-1 focus-visible:ring-black/15"
            />
          </div>

          <div className="ml-auto flex items-center gap-3.5 lg:ml-0">
            <button type="button" className="rounded-full p-1.5 text-black lg:hidden" aria-label="Search products">
              <Search className="size-5" />
            </button>
            <CartSheet />
            <button type="button" className="rounded-full p-1.5 text-black" aria-label="View account">
              <CircleUserRound className="size-5" />
            </button>
          </div>
        </div>

        <div className="pt-4 lg:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-black/40" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="h-12 rounded-full border-0 bg-[#f0f0f0] pl-12 text-base shadow-none placeholder:text-black/40 focus-visible:ring-1 focus-visible:ring-black/15"
            />
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {devLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

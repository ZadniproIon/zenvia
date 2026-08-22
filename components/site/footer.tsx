"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { containerClass, footerColumns, paymentBadges, socialLinks } from "@/components/site/constants";

export function SiteFooter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you for subscribing! Your 20% discount code is SAVE20.");
    setEmail("");
  };

  return (
    <footer className="mt-28 bg-[#f0f0f0]">
      <div className={containerClass}>
        <section className="-translate-y-1/2 rounded-[20px] bg-black px-6 py-8 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-9">
          <div className="max-w-[551px]">
            <h2 className="font-heading text-[32px] leading-[0.95] font-extrabold uppercase tracking-[-0.04em] sm:text-[36px] lg:text-[40px] lg:leading-[45px]">
              Stay upto date about our latest offers
            </h2>
          </div>
          <form className="mt-8 flex w-full max-w-[349px] flex-col gap-3.5 lg:mt-0" onSubmit={handleSubscribe}>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-black/40" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="h-12 rounded-full border-0 bg-white pl-12 text-base text-black shadow-none placeholder:text-black/40 focus-visible:ring-1 focus-visible:ring-white/20"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-[46px] items-center justify-center rounded-full bg-white px-6 text-base font-medium text-black transition hover:bg-white/90"
            >
              Subscribe to Newsletter
            </button>
          </form>
        </section>

        <div className="-mt-8 pb-12 sm:pb-16">
          <div className="grid gap-10 lg:grid-cols-[248px_minmax(0,1fr)] lg:items-start lg:gap-28">
            <div className="space-y-[35px]">
              <div className="space-y-[25px]">
                <Link href="/" className="font-heading text-[33px] font-extrabold uppercase tracking-[-0.05em] text-black">
                  Zenvia
                </Link>
                <p className="max-w-[248px] text-sm leading-[22px] text-black/60">
                  We have clothes that suits your style and which you&apos;re proud to wear. From women to men.
                </p>
              </div>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={cn(
                      "flex size-7 items-center justify-center rounded-full border border-black/20 bg-white text-black transition hover:-translate-y-0.5",
                      social.active && "border-black bg-black text-white"
                    )}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[-0.04em]">{social.mark}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6 lg:gap-12">
              {footerColumns.map((column) => (
                <div key={column.title} className="space-y-[26px]">
                  <h3 className="text-base font-medium uppercase tracking-[0.19em] text-black">{column.title}</h3>
                  <ul className="space-y-[19px] text-base text-black/60">
                    {column.items.map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className="transition hover:text-black">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-black/10 pt-6 sm:flex sm:items-center sm:justify-between">
            <p className="text-sm text-black/60">Zenvia © 2026, All Rights Reserved</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-0 sm:justify-end">
              {paymentBadges.map((badge) => (
                <Image key={badge.alt} src={badge.src} alt={badge.alt} width={47} height={30} className="h-[30px] w-auto" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

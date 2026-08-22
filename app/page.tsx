import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import prisma from "@/lib/prisma";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { brandLogos, containerClass } from "@/components/site/constants";
import { Separator } from "@/components/ui/separator";
import { ProductCard, RatingStars } from "@/components/product-card";
import { cn } from "@/lib/utils";

const styleCards = [
  {
    title: "Casual",
    href: "/shop?dressStyle=Casual",
    image: "/figma-home/browse-casual.png",
    className: "lg:col-span-4 lg:row-span-1",
    imageClassName: "object-cover object-[78%_24%] scale-[1.02]",
  },
  {
    title: "Formal",
    href: "/shop?dressStyle=Formal",
    image: "/figma-home/asset-17.png",
    className: "lg:col-span-8 lg:row-span-1",
    imageClassName: "object-cover object-[84%_18%]",
  },
  {
    title: "Party",
    href: "/shop?dressStyle=Party",
    image: "/figma-home/asset-18.png",
    className: "lg:col-span-8 lg:row-span-1",
    imageClassName: "object-cover object-[65%_12%]",
  },
  {
    title: "Gym",
    href: "/shop?dressStyle=Gym",
    image: "/figma-home/asset-16.png",
    className: "lg:col-span-4 lg:row-span-1",
    imageClassName: "object-cover object-[42%_20%]",
  },
] as const;

const testimonials = [
  {
    name: "Sarah M.",
    text: "I'm blown away by the quality and style of the clothes I received from Zenvia. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    name: "Alex K.",
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Zenvia. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    name: "James L.",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Zenvia. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    name: "Mooen",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Zenvia. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    name: "Samantha D.",
    text: "The shipping was incredibly fast and the materials feel so premium. Absolutely love the streetwear aesthetic and fits!",
  },
] as const;

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="font-heading text-[34px] font-extrabold uppercase leading-none tracking-[-0.04em] text-black sm:text-[40px] lg:text-[48px]">
      {title}
    </h2>
  );
}

function TestimonialCard({ testimonial, faded = false }: { testimonial: (typeof testimonials)[number]; faded?: boolean }) {
  return (
    <article
      className={cn(
        "h-full min-w-[320px] sm:min-w-[380px] rounded-[20px] border border-black/10 bg-white p-7 transition-transform",
        faded && "opacity-50 blur-[1px]"
      )}
    >
      <div className="space-y-[15px]">
        <RatingStars rating={5} />
        <div className="flex items-center gap-1.5">
          <h3 className="text-[20px] font-bold leading-[1.1] text-black">{testimonial.name}</h3>
          <BadgeCheck className="size-5 fill-[#01ab31] text-white" />
        </div>
        <p className="text-base leading-[22px] text-black/60">&ldquo;{testimonial.text}&rdquo;</p>
      </div>
    </article>
  );
}

export default async function Home() {
  const newArrivals = await prisma.product.findMany({
    where: { isNewArrival: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  const topSelling = await prisma.product.findMany({
    where: { isTopSelling: true },
    take: 4,
    orderBy: { rating: "desc" },
  });

  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="overflow-hidden bg-[#f2f0f1]">
          <div className={`${containerClass} relative grid min-h-[calc(100vh-120px)] gap-10 py-12 sm:py-16 lg:min-h-[663px] lg:grid-cols-[577px_minmax(0,1fr)] lg:items-center lg:gap-0 lg:py-0`}>
            <Sparkles className="absolute right-[4%] top-[13%] hidden size-[104px] fill-black text-black lg:block" strokeWidth={1.25} />
            <Sparkles className="absolute left-[57%] top-[46%] hidden size-14 fill-black text-black lg:block" strokeWidth={1.25} />

            <div className="relative z-10 max-w-[596px] space-y-8 lg:py-20">
              <div className="space-y-5">
                <h1 className="max-w-[577px] font-heading text-[42px] font-extrabold uppercase leading-[0.9] tracking-[-0.05em] text-black sm:text-[54px] lg:text-[64px]">
                  Find clothes that matches your style
                </h1>
                <p className="max-w-[545px] text-[15px] leading-[22px] text-black/60 sm:text-base">
                  Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                </p>
              </div>

              <Link
                href="/shop"
                className="inline-flex h-[52px] items-center justify-center rounded-full bg-black px-[54px] text-base font-medium text-white transition hover:bg-black/90 shadow-lg"
              >
                Shop Now
              </Link>

              <div className="grid max-w-[596px] grid-cols-2 gap-6 pt-1 sm:grid-cols-3 sm:gap-8 lg:flex lg:items-center lg:gap-8">
                {[
                  { value: "200+", label: "International Brands" },
                  { value: "2,000+", label: "High-Quality Products" },
                  { value: "30,000+", label: "Happy Customers" },
                ].map((stat, index) => (
                  <div key={stat.label} className="flex items-center gap-8">
                    <div>
                      <p className="text-[28px] font-bold leading-none tracking-[-0.03em] sm:text-[40px]">{stat.value}</p>
                      <p className="mt-2 text-sm leading-[22px] text-black/60 sm:text-base">{stat.label}</p>
                    </div>
                    {index < 2 ? <span className="hidden h-[74px] w-px bg-black/10 lg:block" /> : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-[560px] justify-center self-end lg:absolute lg:bottom-0 lg:right-0 lg:h-full lg:w-[46.7%] lg:max-w-none lg:items-end lg:justify-end">
              <Image
                src="/figma-home/hero-models.png"
                alt="Fashion models wearing Zenvia signature outerwear"
                width={672}
                height={663}
                priority
                className="h-auto w-full max-w-[620px] object-contain lg:max-w-[672px]"
              />
            </div>
          </div>
        </section>

        {/* Brands Strip */}
        <section id="brands" className="bg-black">
          <div className={`${containerClass} flex flex-wrap items-center justify-center gap-x-8 gap-y-6 py-10 sm:justify-between lg:h-[122px] lg:flex-nowrap lg:py-0`}>
            {brandLogos.map((logo) => (
              <Image key={logo.alt} src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-auto w-auto max-h-10 opacity-90 hover:opacity-100 transition" />
            ))}
          </div>
        </section>

        {/* New Arrivals Section */}
        <section id="new-arrivals" className={`${containerClass} pt-14 sm:pt-[72px]`}>
          <div className="space-y-10 sm:space-y-[55px]">
            <div className="text-center">
              <SectionHeading title="New Arrivals" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-5">
              {newArrivals.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  brand={product.brand}
                  image={product.image}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  rating={product.rating}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Link
                href="/shop?sort=newest"
                className="inline-flex h-[52px] min-w-[218px] items-center justify-center rounded-full border border-black/10 px-12 text-sm font-medium text-black transition hover:bg-black hover:text-white sm:text-base"
              >
                View All
              </Link>
            </div>
          </div>
        </section>

        <div className={`${containerClass} pt-16 sm:pt-20`}>
          <Separator className="bg-black/10" />
        </div>

        {/* Top Selling Section */}
        <section id="top-selling" className={`${containerClass} pt-14 sm:pt-[72px]`}>
          <div className="space-y-10 sm:space-y-[55px]">
            <div className="text-center">
              <SectionHeading title="Top Selling" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-5">
              {topSelling.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  brand={product.brand}
                  image={product.image}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  rating={product.rating}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Link
                href="/shop?sort=popular"
                className="inline-flex h-[52px] min-w-[218px] items-center justify-center rounded-full border border-black/10 px-12 text-sm font-medium text-black transition hover:bg-black hover:text-white sm:text-base"
              >
                View All
              </Link>
            </div>
          </div>
        </section>

        {/* Browse by Dress Style */}
        <section className={`${containerClass} pt-14 sm:pt-20`}>
          <div className="rounded-[28px] bg-[#f0f0f0] px-4 py-10 sm:px-6 md:px-10 lg:px-16 lg:py-[70px]">
            <div className="text-center">
              <SectionHeading title="Browse by Dress Style" />
            </div>
            <div className="mt-10 grid auto-rows-[190px] grid-cols-2 gap-4 lg:mt-16 lg:auto-rows-[289px] lg:grid-cols-12 lg:gap-5">
              {styleCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className={cn("group relative overflow-hidden rounded-[20px] bg-white transition hover:shadow-md", card.className)}
                >
                  <h3 className="relative z-10 px-6 pt-6 text-[28px] font-bold leading-none tracking-[-0.04em] text-black lg:px-9 lg:pt-6 lg:text-[36px]">
                    {card.title}
                  </h3>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className={cn("transition-transform duration-300 group-hover:scale-105", card.imageClassName)}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Happy Customers Testimonials */}
        <section id="testimonials" className={`${containerClass} overflow-hidden pt-14 sm:pt-20 lg:pt-[76px]`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <SectionHeading title="Our Happy Customers" />
            <div className="flex items-center gap-3 self-end lg:self-auto">
              <button type="button" className="rounded-full p-2 text-black transition hover:bg-black/5" aria-label="Previous testimonials">
                <ChevronLeft className="size-6" />
              </button>
              <button type="button" className="rounded-full p-2 text-black transition hover:bg-black/5" aria-label="Next testimonials">
                <ChevronRight className="size-6" />
              </button>
            </div>
          </div>

          <div className="mt-10 overflow-hidden lg:mt-12">
            <div className="flex gap-5 overflow-x-auto pb-4 lg:overflow-visible">
              {testimonials.map((testimonial, index) => (
                <div key={`${testimonial.name}-${index}`} className="shrink-0 lg:w-[400px]">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

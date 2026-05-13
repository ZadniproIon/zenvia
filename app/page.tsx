import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Mail,
  Menu,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const containerClass = "mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-0";

const navLinks: Array<{ label: string; href: string; hasChevron?: boolean }> = [
  { label: "Shop", href: "#shop", hasChevron: true },
  { label: "On Sale", href: "#on-sale" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Brands", href: "#brands" },
];

const brandLogos = [
  { src: "/figma-home/brand-versace.svg", alt: "Versace", width: 166, height: 34 },
  { src: "/figma-home/brand-zara.svg", alt: "Zara", width: 91, height: 38 },
  { src: "/figma-home/brand-gucci.svg", alt: "Gucci", width: 156, height: 36 },
  { src: "/figma-home/brand-prada.svg", alt: "Prada", width: 194, height: 32 },
  { src: "/figma-home/brand-calvin.svg", alt: "Calvin Klein", width: 207, height: 34 },
] as const;

type Product = {
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  imageClassName?: string;
};

const newArrivals: Product[] = [
  {
    name: "T-shirt with Tape Details",
    image: "/figma-home/new-1.png",
    price: 120,
    rating: 4.5,
    imageClassName: "scale-[1.08] translate-y-3",
  },
  {
    name: "Skinny Fit Jeans",
    image: "/figma-home/new-2.png",
    price: 240,
    originalPrice: 260,
    discount: "-20%",
    rating: 3.5,
    imageClassName: "scale-[1.06] translate-y-5",
  },
  {
    name: "Checkered Shirt",
    image: "/figma-home/new-3.png",
    price: 180,
    rating: 4.5,
    imageClassName: "scale-[1.08] translate-y-3",
  },
  {
    name: "Sleeve Striped T-shirt",
    image: "/figma-home/new-4.png",
    price: 130,
    originalPrice: 160,
    discount: "-30%",
    rating: 4.5,
    imageClassName: "scale-[1.08] translate-y-4",
  },
];

const topSelling: Product[] = [
  {
    name: "Vertical Striped Shirt",
    image: "/figma-home/top-1.png",
    price: 212,
    originalPrice: 232,
    discount: "-20%",
    rating: 5,
    imageClassName: "scale-[1.1] translate-y-4",
  },
  {
    name: "Courage Graphic T-shirt",
    image: "/figma-home/top-2.png",
    price: 145,
    rating: 4,
    imageClassName: "scale-[1.08] translate-y-4",
  },
  {
    name: "Loose Fit Bermuda Shorts",
    image: "/figma-home/asset-13.png",
    price: 80,
    rating: 3,
    imageClassName: "scale-[1.14] translate-y-8",
  },
  {
    name: "Faded Skinny Jeans",
    image: "/figma-home/asset-14.png",
    price: 210,
    rating: 4.5,
    imageClassName: "scale-[1.1] translate-y-5",
  },
];

const styleCards = [
  {
    title: "Casual",
    image: "/figma-home/browse-casual.png",
    className: "lg:col-span-4 lg:row-span-1",
    imageClassName: "object-cover object-[78%_24%] scale-[1.02]",
  },
  {
    title: "Formal",
    image: "/figma-home/asset-17.png",
    className: "lg:col-span-8 lg:row-span-1",
    imageClassName: "object-cover object-[84%_18%]",
  },
  {
    title: "Party",
    image: "/figma-home/asset-18.png",
    className: "lg:col-span-8 lg:row-span-1",
    imageClassName: "object-cover object-[65%_12%]",
  },
  {
    title: "Gym",
    image: "/figma-home/asset-16.png",
    className: "lg:col-span-4 lg:row-span-1",
    imageClassName: "object-cover object-[42%_20%]",
  },
] as const;

type Testimonial = {
  name: string;
  text: string;
};

const testimonials: Testimonial[] = [
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
    name: "Sarah M.",
    text: "I'm blown away by the quality and style of the clothes I received from Zenvia. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
];

const footerColumns = [
  {
    title: "Company",
    items: ["About", "Features", "Works", "Career"],
  },
  {
    title: "Help",
    items: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"],
  },
  {
    title: "FAQ",
    items: ["Account", "Manage Deliveries", "Orders", "Payments"],
  },
  {
    title: "Resources",
    items: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"],
  },
] as const;

const socialLinks: Array<{ label: string; href: string; mark: string; active?: boolean }> = [
  { label: "Twitter", href: "#", mark: "t", active: true },
  { label: "Facebook", href: "#", mark: "f" },
  { label: "Instagram", href: "#", mark: "ig" },
  { label: "Github", href: "#", mark: "gh" },
];

const paymentBadges = [
  { src: "/figma-home/payment-visa.svg", alt: "Visa" },
  { src: "/figma-home/payment-mastercard.svg", alt: "Mastercard" },
  { src: "/figma-home/payment-paypal.svg", alt: "PayPal" },
  { src: "/figma-home/payment-applepay.svg", alt: "Apple Pay" },
  { src: "/figma-home/payment-googlepay.svg", alt: "Google Pay" },
] as const;

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[5.5px]" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, rating - index));

        return (
          <span key={index} className="relative block size-[18px]">
            <Star className="size-[18px] fill-[#FFC633]/25 text-[#FFC633]" strokeWidth={1.4} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="size-[18px] fill-[#FFC633] text-[#FFC633]" strokeWidth={1.4} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function PriceBlock({
  price,
  originalPrice,
  discount,
}: Pick<Product, "price" | "originalPrice" | "discount">) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 text-[24px] font-bold leading-none tracking-[-0.03em] text-black sm:gap-3">
      <span>${price}</span>
      {originalPrice ? <span className="text-black/40 line-through">${originalPrice}</span> : null}
      {discount ? (
        <span className="rounded-full bg-[#ff3333]/10 px-3.5 py-1.5 text-xs font-medium text-[#ff3333] sm:text-sm">
          {discount}
        </span>
      ) : null}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="space-y-3.5">
      <div className="relative aspect-[295/298] overflow-hidden rounded-[20px] bg-[#f0eeed]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 295px"
          className={cn("object-contain", product.imageClassName)}
        />
      </div>
      <div className="space-y-2.5">
        <h3 className="text-base font-bold leading-[1.35] text-black sm:text-[20px]">
          {product.name}
        </h3>
        <div className="flex items-center gap-[13px] text-xs text-black sm:text-sm">
          <RatingStars rating={product.rating} />
          <span>
            {product.rating.toFixed(1)}/<span className="text-black/60">5</span>
          </span>
        </div>
        <PriceBlock price={product.price} originalPrice={product.originalPrice} discount={product.discount} />
      </div>
    </article>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="font-heading text-[34px] leading-none font-extrabold uppercase tracking-[-0.04em] text-black sm:text-[40px] lg:text-[48px]">
      {title}
    </h2>
  );
}

function TestimonialCard({
  testimonial,
  faded = false,
}: {
  testimonial: Testimonial;
  faded?: boolean;
}) {
  return (
    <article
      className={cn(
        "h-full min-w-[340px] rounded-[20px] border border-black/10 bg-white px-8 py-7 transition-transform",
        faded && "opacity-50 blur-[2px]"
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

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-transparent">
        <div className="bg-black text-white">
          <div className={`${containerClass} relative flex min-h-[38px] items-center justify-center py-2`}>
            <p className="text-center text-xs leading-normal sm:text-sm">
              Sign up and get 20% off to your first order. {" "}
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

            <Link href="#" className="font-heading text-[28px] font-extrabold uppercase tracking-[-0.05em] sm:text-[32px]">
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
              <button type="button" className="rounded-full p-1.5 text-black" aria-label="View cart">
                <ShoppingCart className="size-5" />
              </button>
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
          </div>
        </div>
      </header>

      <main>
        <section className="overflow-hidden bg-[#f2f0f1]">
          <div className={`${containerClass} relative grid min-h-[calc(100vh-120px)] gap-10 py-12 sm:py-16 lg:min-h-[663px] lg:grid-cols-[577px_minmax(0,1fr)] lg:items-center lg:gap-0 lg:py-0`}>
            <Sparkles className="absolute right-[4%] top-[13%] hidden size-[104px] fill-black text-black lg:block" strokeWidth={1.25} />
            <Sparkles className="absolute left-[57%] top-[46%] hidden size-14 fill-black text-black lg:block" strokeWidth={1.25} />

            <div className="relative z-10 max-w-[596px] space-y-8 lg:py-20">
              <div className="space-y-5">
                <h1 className="max-w-[577px] font-heading text-[42px] leading-[0.9] font-extrabold uppercase tracking-[-0.05em] text-black sm:text-[54px] lg:text-[64px]">
                  Find clothes that matches your style
                </h1>
                <p className="max-w-[545px] text-[15px] leading-[22px] text-black/60 sm:text-base">
                  Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                </p>
              </div>

              <Link
                href="#new-arrivals"
                className="inline-flex h-[52px] items-center justify-center rounded-full bg-black px-[54px] text-base font-medium text-white transition hover:bg-black/90"
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
                      <p className="text-[28px] font-bold leading-none tracking-[-0.03em] sm:text-[40px]">
                        {stat.value}
                      </p>
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

        <section id="brands" className="bg-black">
          <div className={`${containerClass} flex flex-wrap items-center justify-center gap-x-8 gap-y-6 py-10 sm:justify-between lg:h-[122px] lg:flex-nowrap lg:py-0`}>
            {brandLogos.map((logo) => (
              <Image key={logo.alt} src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-auto w-auto max-h-10" />
            ))}
          </div>
        </section>

        <section id="new-arrivals" className={`${containerClass} pt-14 sm:pt-[72px]`}>
          <div className="space-y-10 sm:space-y-[55px]">
            <div className="text-center">
              <SectionHeading title="New Arrivals" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-5">
              {newArrivals.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="inline-flex h-[52px] min-w-[218px] items-center justify-center rounded-full border border-black/10 px-12 text-sm font-medium text-black transition hover:bg-black hover:text-white sm:text-base"
              >
                View All
              </button>
            </div>
          </div>
        </section>

        <div className={`${containerClass} pt-16 sm:pt-20`}>
          <Separator className="bg-black/10" />
        </div>

        <section id="on-sale" className={`${containerClass} pt-14 sm:pt-[72px]`}>
          <div className="space-y-10 sm:space-y-[55px]">
            <div className="text-center">
              <SectionHeading title="Top Selling" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-5">
              {topSelling.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="inline-flex h-[52px] min-w-[218px] items-center justify-center rounded-full border border-black/10 px-12 text-sm font-medium text-black transition hover:bg-black hover:text-white sm:text-base"
              >
                View All
              </button>
            </div>
          </div>
        </section>

        <section className={`${containerClass} pt-14 sm:pt-20`}>
          <div className="rounded-[28px] bg-[#f0f0f0] px-4 py-10 sm:px-6 md:px-10 lg:px-16 lg:py-[70px]">
            <div className="text-center">
              <SectionHeading title="Browse by Dress Style" />
            </div>
            <div className="mt-10 grid auto-rows-[190px] grid-cols-2 gap-4 lg:mt-16 lg:auto-rows-[289px] lg:grid-cols-12 lg:gap-5">
              {styleCards.map((card) => (
                <article
                  key={card.title}
                  className={cn(
                    "relative overflow-hidden rounded-[20px] bg-white",
                    card.className
                  )}
                >
                  <h3 className="relative z-10 px-6 pt-6 text-[28px] font-bold leading-none tracking-[-0.04em] text-black lg:px-9 lg:pt-6 lg:text-[36px]">
                    {card.title}
                  </h3>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className={card.imageClassName}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${containerClass} overflow-hidden pt-14 sm:pt-20 lg:pt-[76px]`}>
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
            <div className="flex gap-5 overflow-x-auto pb-2 lg:min-w-[calc(400px*5+20px*4)] lg:translate-x-[-320px] lg:overflow-visible lg:pb-0">
              {testimonials.map((testimonial, index) => (
                <div key={`${testimonial.name}-${index}`} className="shrink-0 lg:w-[400px]">
                  <TestimonialCard testimonial={testimonial} faded={index === 0 || index === testimonials.length - 1} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-28 bg-[#f0f0f0]">
        <div className={`${containerClass}`}>
          <section className="-translate-y-1/2 rounded-[20px] bg-black px-6 py-8 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-9">
            <div className="max-w-[551px]">
              <h2 className="font-heading text-[32px] leading-[0.95] font-extrabold uppercase tracking-[-0.04em] sm:text-[36px] lg:text-[40px] lg:leading-[45px]">
                Stay upto date about our latest offers
              </h2>
            </div>
            <form className="mt-8 flex w-full max-w-[349px] flex-col gap-3.5 lg:mt-0" action="#">
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-black/40" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
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
                  <Link href="#" className="font-heading text-[33px] font-extrabold uppercase tracking-[-0.05em] text-black">
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
                    <h3 className="text-base font-medium uppercase tracking-[0.19em] text-black">
                      {column.title}
                    </h3>
                    <ul className="space-y-[19px] text-base text-black/60">
                      {column.items.map((item) => (
                        <li key={item}>
                          <Link href="#" className="transition hover:text-black">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 border-t border-black/10 pt-6 sm:flex sm:items-center sm:justify-between">
              <p className="text-sm text-black/60">Zenvia © 2000-2023, All Rights Reserved</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-0 sm:justify-end">
                {paymentBadges.map((badge) => (
                  <Image key={badge.alt} src={badge.src} alt={badge.alt} width={47} height={30} className="h-[30px] w-auto" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}









export const containerClass = "mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-0";

export const navLinks: Array<{ label: string; href: string; hasChevron?: boolean }> = [
  { label: "Shop", href: "#shop", hasChevron: true },
  { label: "On Sale", href: "#on-sale" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Brands", href: "#brands" },
];

export const devLinks = [
  { label: "Product Page", href: "/dev/product" },
  { label: "Store Page", href: "/dev/store" },
] as const;

export const brandLogos = [
  { src: "/figma-home/brand-versace.svg", alt: "Versace", width: 166, height: 34 },
  { src: "/figma-home/brand-zara.svg", alt: "Zara", width: 91, height: 38 },
  { src: "/figma-home/brand-gucci.svg", alt: "Gucci", width: 156, height: 36 },
  { src: "/figma-home/brand-prada.svg", alt: "Prada", width: 194, height: 32 },
  { src: "/figma-home/brand-calvin.svg", alt: "Calvin Klein", width: 207, height: 34 },
] as const;

export const footerColumns = [
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

export const socialLinks: Array<{ label: string; href: string; mark: string; active?: boolean }> = [
  { label: "Twitter", href: "#", mark: "t", active: true },
  { label: "Facebook", href: "#", mark: "f" },
  { label: "Instagram", href: "#", mark: "ig" },
  { label: "Github", href: "#", mark: "gh" },
];

export const paymentBadges = [
  { src: "/figma-home/payment-visa.svg", alt: "Visa" },
  { src: "/figma-home/payment-mastercard.svg", alt: "Mastercard" },
  { src: "/figma-home/payment-paypal.svg", alt: "PayPal" },
  { src: "/figma-home/payment-applepay.svg", alt: "Apple Pay" },
  { src: "/figma-home/payment-googlepay.svg", alt: "Google Pay" },
] as const;

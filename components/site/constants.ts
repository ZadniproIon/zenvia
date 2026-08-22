export const containerClass = "mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-0";

export const navLinks: Array<{ label: string; href: string; hasChevron?: boolean; subItems?: Array<{ label: string; href: string }> }> = [
  {
    label: "Shop",
    href: "/shop",
    hasChevron: true,
    subItems: [
      { label: "All Products", href: "/shop" },
      { label: "T-Shirts", href: "/shop?category=t-shirts" },
      { label: "Shirts", href: "/shop?category=shirts" },
      { label: "Jeans", href: "/shop?category=jeans" },
      { label: "Shorts", href: "/shop?category=shorts" },
      { label: "Hoodies", href: "/shop?category=hoodie" },
      { label: "Shoes & Sneakers", href: "/shop?category=shoes" },
    ]
  },
  { label: "On Sale", href: "/shop?onSale=true" },
  { label: "New Arrivals", href: "/#new-arrivals" },
  { label: "Brands", href: "/#brands" },
];

export const quickLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Cart", href: "/cart" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Admin Dashboard", href: "/admin" },
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
    items: [
      { label: "About", href: "/#brands" },
      { label: "Features", href: "/shop" },
      { label: "Works", href: "/shop" },
      { label: "Career", href: "/#testimonials" },
    ],
  },
  {
    title: "Help",
    items: [
      { label: "Customer Support", href: "/shop" },
      { label: "Delivery Details", href: "/cart" },
      { label: "Terms & Conditions", href: "/shop" },
      { label: "Privacy Policy", href: "/shop" },
    ],
  },
  {
    title: "FAQ",
    items: [
      { label: "Account", href: "/login" },
      { label: "Manage Deliveries", href: "/admin/orders" },
      { label: "Orders", href: "/admin/orders" },
      { label: "Payments", href: "/cart" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Free eBooks", href: "/shop" },
      { label: "Development Tutorial", href: "/shop" },
      { label: "How to - Blog", href: "/shop" },
      { label: "Youtube Playlist", href: "/shop" },
    ],
  },
] as const;

export const socialLinks: Array<{ label: string; href: string; mark: string; active?: boolean }> = [
  { label: "Twitter", href: "https://twitter.com", mark: "t", active: true },
  { label: "Facebook", href: "https://facebook.com", mark: "f" },
  { label: "Instagram", href: "https://instagram.com", mark: "ig" },
  { label: "Github", href: "https://github.com", mark: "gh" },
];

export const paymentBadges = [
  { src: "/figma-home/payment-visa.svg", alt: "Visa" },
  { src: "/figma-home/payment-mastercard.svg", alt: "Mastercard" },
  { src: "/figma-home/payment-paypal.svg", alt: "PayPal" },
  { src: "/figma-home/payment-applepay.svg", alt: "Apple Pay" },
  { src: "/figma-home/payment-googlepay.svg", alt: "Google Pay" },
] as const;

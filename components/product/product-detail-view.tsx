"use client";

import Image from "next/image";
import { useState } from "react";
import { BadgeCheck, Check, ChevronDown, Heart, Maximize2, Minus, Plus, SlidersHorizontal, Star, ZoomIn } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { useWishlist } from "@/components/wishlist-provider";
import { RatingStars } from "@/components/product-card";
import { WriteReviewDialog } from "@/components/product/write-review-dialog";
import { ImageViewerDialog } from "@/components/product/image-viewer-dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type ProductDetailViewProps = {
  product: {
    id: string;
    name: string;
    brand?: string | null;
    description: string | null;
    price: number;
    originalPrice: number | null;
    discount: string | null;
    image: string;
    galleryImages: string | null;
    rating: number;
    reviewCount: number;
    stock: number;
    dressStyle?: string | null;
    sizes: string | null;
    colors: string | null;
    category?: { name: string; slug: string | null } | null;
    reviews: {
      id: string;
      userName: string;
      rating: number;
      comment: string;
      verified: boolean;
      createdAt: Date | string;
    }[];
  };
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Parse gallery images
  let gallery: string[] = [product.image];
  try {
    if (product.galleryImages) {
      const parsed = JSON.parse(product.galleryImages);
      if (Array.isArray(parsed) && parsed.length > 0) {
        gallery = parsed;
      }
    }
  } catch (e) {}

  // Parse sizes
  let sizeList = ["Small", "Medium", "Large", "X-Large"];
  try {
    if (product.sizes) {
      const parsed = JSON.parse(product.sizes);
      if (Array.isArray(parsed) && parsed.length > 0) sizeList = parsed;
    }
  } catch (e) {}

  // Parse colors
  let colorList = [
    { name: "Olive", value: "#4F5B37" },
    { name: "Forest", value: "#314F4A" },
    { name: "Indigo", value: "#31344F" },
  ];
  try {
    if (product.colors) {
      const parsed = JSON.parse(product.colors);
      if (Array.isArray(parsed) && parsed.length > 0) colorList = parsed;
    }
  } catch (e) {}

  const [activeImage, setActiveImage] = useState(gallery[0] || product.image);
  const [selectedColor, setSelectedColor] = useState(colorList[0]?.name || "Default");
  const [selectedSize, setSelectedSize] = useState(sizeList[2] || sizeList[0] || "Large");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "faqs">("reviews");
  const [sortReviews, setSortReviews] = useState<"latest" | "highest">("latest");
  const [visibleReviewCount, setVisibleReviewCount] = useState(6);

  // Fullscreen Image Viewer Modal State
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const currentImageIndex = gallery.indexOf(activeImage) >= 0 ? gallery.indexOf(activeImage) : 0;
  const [viewerIndex, setViewerIndex] = useState(0);

  const openViewerAtIndex = (idx: number) => {
    setViewerIndex(idx);
    setIsViewerOpen(true);
  };

  const activeWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: activeImage || product.image,
      size: selectedSize,
      color: selectedColor,
    });
  };

  const sortedReviews = [...product.reviews].sort((a, b) => {
    if (sortReviews === "highest") {
      return b.rating - a.rating;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-16">
      {/* Product Hero Section */}
      <div className="grid gap-8 lg:grid-cols-[610px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[630px_minmax(0,1fr)]">
        {/* Left Column: Gallery Images */}
        <div className="flex flex-col-reverse gap-3.5 sm:flex-row sm:gap-3.5">
          {/* Vertical Thumbnail Strip */}
          <div className="flex gap-3 overflow-x-auto sm:w-[152px] sm:shrink-0 sm:flex-col sm:overflow-visible">
            {gallery.map((img, idx) => (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={() => {
                  setActiveImage(img);
                }}
                className={cn(
                  "relative aspect-square w-24 shrink-0 overflow-hidden rounded-[20px] bg-[#E2E2E2] transition sm:h-[167px] sm:w-full cursor-pointer",
                  activeImage === img ? "border-2 border-black" : "border border-transparent hover:border-black/20"
                )}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  sizes="152px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Large Main Preview Image with Click to Zoom */}
          <div
            onClick={() => openViewerAtIndex(currentImageIndex)}
            className="group relative aspect-square w-full overflow-hidden rounded-[20px] bg-[#E2E2E2] sm:h-[530px] cursor-zoom-in"
          >
            <Image
              src={activeImage || product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 444px"
              className="object-cover transition duration-300 group-hover:scale-105"
            />

            {/* Expand / Zoom Overlay Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md opacity-0 transition group-hover:opacity-100 shadow-md">
              <ZoomIn className="size-3.5" />
              <span>Full View</span>
            </div>
          </div>
        </div>

        {/* Fullscreen Carousel Modal */}
        <ImageViewerDialog
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          images={gallery}
          currentIndex={viewerIndex}
          onSelectIndex={setViewerIndex}
          productName={product.name}
          brand={product.brand}
        />

        {/* Right Column: Product Info & Purchase Options */}
        <div className="space-y-6 lg:py-2">
          <div className="space-y-3.5">
            {product.brand && (
              <div className="inline-flex items-center gap-2">
                <span className="rounded-full bg-black px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {product.brand}
                </span>
                {product.dressStyle && (
                  <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/70">
                    {product.dressStyle}
                  </span>
                )}
              </div>
            )}
            <h1 className="font-heading text-[32px] font-extrabold uppercase leading-[1.05] tracking-[-0.04em] text-black sm:text-[40px]">
              {product.name}
            </h1>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-3 text-sm">
              <RatingStars rating={product.rating} />
              <span className="text-black">
                {product.rating.toFixed(1)}/<span className="text-black/60">5</span>
              </span>
              <span className="text-xs text-black/40">({product.reviewCount || product.reviews.length} reviews)</span>
            </div>

            {/* Pricing with Discount Badge */}
            <div className="flex flex-wrap items-center gap-3 text-[30px] font-bold leading-none tracking-[-0.03em] text-black sm:text-[32px]">
              <span>${product.price.toFixed(0)}</span>
              {product.originalPrice ? (
                <span className="text-black/30 line-through">${product.originalPrice.toFixed(0)}</span>
              ) : null}
              {product.discount ? (
                <span className="rounded-full bg-[#ff3333]/10 px-3.5 py-1.5 text-sm font-medium text-[#ff3333]">
                  {product.discount}
                </span>
              ) : null}
            </div>

            {/* Description */}
            <p className="text-sm leading-[22px] text-black/60 sm:text-base">
              {product.description ||
                "This piece is crafted from premium soft and breathable fabric, engineered for superior everyday comfort and effortless style."}
            </p>
          </div>

          <Separator className="bg-black/10" />

          {/* Color Selector */}
          <div className="space-y-3">
            <p className="text-sm text-black/60 sm:text-base font-medium">Select Colors</p>
            <div className="flex flex-wrap items-center gap-4">
              {colorList.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  aria-label={`Select ${c.name} color`}
                  className={cn(
                    "relative flex size-[37px] items-center justify-center rounded-full transition cursor-pointer hover:scale-110",
                    selectedColor === c.name && "ring-2 ring-black ring-offset-2"
                  )}
                  style={{ backgroundColor: c.value }}
                >
                  {selectedColor === c.name ? <Check className="size-4.5 text-white" strokeWidth={3} /> : null}
                </button>
              ))}
            </div>
          </div>

          <Separator className="bg-black/10" />

          {/* Size Selector */}
          <div className="space-y-3">
            <p className="text-sm text-black/60 sm:text-base font-medium">Choose Size</p>
            <div className="flex flex-wrap gap-3">
              {sizeList.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "rounded-full px-6 py-3 text-sm font-medium transition cursor-pointer",
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-black/60 hover:bg-[#e4e4e4] hover:text-black"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <Separator className="bg-black/10" />

          {/* Quantity Stepper & Add to Cart */}
          <div className="flex flex-wrap items-center gap-3 pt-2 sm:gap-4">
            {/* Stepper */}
            <div className="flex h-[52px] w-[130px] sm:w-[150px] items-center justify-between rounded-full bg-[#F0F0F0] px-4">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex size-8 items-center justify-center text-black/60 transition hover:text-black cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <span className="text-base font-bold text-black">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="flex size-8 items-center justify-center text-black/60 transition hover:text-black cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 h-[52px] rounded-full bg-black px-8 text-base font-medium text-white transition hover:bg-black/90 cursor-pointer shadow-md active:scale-98"
            >
              Add to Cart
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() =>
                toggleWishlist({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  discount: product.discount,
                  image: activeImage || product.image,
                  rating: product.rating,
                })
              }
              aria-label="Wishlist"
              className={cn(
                "flex size-[52px] items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-black/5 cursor-pointer",
                activeWishlist && "border-red-200 bg-red-50 text-red-500"
              )}
            >
              <Heart className={cn("size-5", activeWishlist && "fill-red-500")} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section: Product Details, Rating & Reviews, FAQs */}
      <div className="space-y-8 pt-8">
        <div className="flex border-b border-black/10">
          <button
            type="button"
            onClick={() => setActiveTab("details")}
            className={cn(
              "flex-1 pb-4 text-center text-base sm:text-lg font-medium transition cursor-pointer",
              activeTab === "details"
                ? "border-b-2 border-black font-bold text-black"
                : "text-black/60 hover:text-black"
            )}
          >
            Product Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={cn(
              "flex-1 pb-4 text-center text-base sm:text-lg font-medium transition cursor-pointer",
              activeTab === "reviews"
                ? "border-b-2 border-black font-bold text-black"
                : "text-black/60 hover:text-black"
            )}
          >
            Rating & Reviews ({product.reviews.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("faqs")}
            className={cn(
              "flex-1 pb-4 text-center text-base sm:text-lg font-medium transition cursor-pointer",
              activeTab === "faqs"
                ? "border-b-2 border-black font-bold text-black"
                : "text-black/60 hover:text-black"
            )}
          >
            FAQs
          </button>
        </div>

        {/* Tab 1: Product Details */}
        {activeTab === "details" && (
          <div className="space-y-6 max-w-3xl animate-in fade-in-50 duration-200">
            <h3 className="text-xl font-bold text-black">Product Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl border border-black/10 p-4 bg-[#F9F9F9]">
                <span className="text-black/50 block text-xs">Material Composition</span>
                <span className="font-semibold text-black">100% Combed Organic Cotton</span>
              </div>
              <div className="rounded-xl border border-black/10 p-4 bg-[#F9F9F9]">
                <span className="text-black/50 block text-xs">Fit Silhouette</span>
                <span className="font-semibold text-black">Modern Relaxed Cut</span>
              </div>
              <div className="rounded-xl border border-black/10 p-4 bg-[#F9F9F9]">
                <span className="text-black/50 block text-xs">Care Instructions</span>
                <span className="font-semibold text-black">Machine Wash Cold, Tumble Dry Low</span>
              </div>
              <div className="rounded-xl border border-black/10 p-4 bg-[#F9F9F9]">
                <span className="text-black/50 block text-xs">Origin</span>
                <span className="font-semibold text-black">Sustainably Crafted in Portugal</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Rating & Reviews */}
        {activeTab === "reviews" && (
          <div className="space-y-8 animate-in fade-in-50 duration-200">
            {/* Reviews Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-black">All Reviews</h3>
                <span className="text-sm sm:text-base text-black/60">({product.reviews.length})</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSortReviews(sortReviews === "latest" ? "highest" : "latest")}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-[#F0F0F0] px-4 text-sm font-medium text-black transition hover:bg-[#e5e5e5] cursor-pointer"
                >
                  <span>Sort: {sortReviews === "latest" ? "Latest" : "Highest Rating"}</span>
                  <ChevronDown className="size-4" />
                </button>

                <WriteReviewDialog productId={product.id} productName={product.name} />
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid gap-5 md:grid-cols-2">
              {sortedReviews.slice(0, visibleReviewCount).map((review) => (
                <article
                  key={review.id}
                  className="rounded-[20px] border border-black/10 p-6 sm:p-7 space-y-3.5 bg-white shadow-xs"
                >
                  <RatingStars rating={review.rating} />
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-lg sm:text-[19px] font-bold text-black">{review.userName}</h4>
                    {review.verified && <BadgeCheck className="size-5 fill-[#01ab31] text-white" />}
                  </div>
                  <p className="text-sm leading-relaxed text-black/60">&ldquo;{review.comment}&rdquo;</p>
                  <p className="text-xs font-medium text-black/40 pt-1">
                    Posted on{" "}
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {sortedReviews.length > visibleReviewCount && (
              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={() => setVisibleReviewCount((c) => c + 6)}
                  className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-full border border-black/10 px-8 text-sm font-medium text-black transition hover:bg-black hover:text-white cursor-pointer"
                >
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: FAQs */}
        {activeTab === "faqs" && (
          <div className="space-y-4 max-w-3xl animate-in fade-in-50 duration-200">
            <div className="rounded-xl border border-black/10 p-5 bg-[#F9F9F9] space-y-1">
              <h4 className="font-bold text-black">How long does shipping take?</h4>
              <p className="text-sm text-black/60">Standard delivery takes 3-5 business days. Express shipping is 1-2 business days.</p>
            </div>
            <div className="rounded-xl border border-black/10 p-5 bg-[#F9F9F9] space-y-1">
              <h4 className="font-bold text-black">What is your return policy?</h4>
              <p className="text-sm text-black/60">We offer a 30-day hassle-free return guarantee for all unworn items in original packaging.</p>
            </div>
            <div className="rounded-xl border border-black/10 p-5 bg-[#F9F9F9] space-y-1">
              <h4 className="font-bold text-black">How do I choose my size?</h4>
              <p className="text-sm text-black/60">Our clothes are true to size. If you prefer an oversized streetwear look, we recommend sizing up one size.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

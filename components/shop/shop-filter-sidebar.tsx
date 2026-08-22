"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Check, ChevronDown, ChevronRight, SlidersHorizontal, X } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const categoryLinks = [
  { label: "All Items", value: "" },
  { label: "T-shirts", value: "t-shirts" },
  { label: "Shirts", value: "shirts" },
  { label: "Jeans", value: "jeans" },
  { label: "Shorts", value: "shorts" },
  { label: "Hoodie", value: "hoodie" },
  { label: "Shoes", value: "shoes" },
];

const dressStyles = [
  { label: "All Styles", value: "" },
  { label: "Casual", value: "Casual" },
  { label: "Formal", value: "Formal" },
  { label: "Party", value: "Party" },
  { label: "Gym", value: "Gym" },
];

const sizeChips = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];

const colorDots = [
  { name: "Green", color: "#00C12B" },
  { name: "Red", color: "#F50606" },
  { name: "Yellow", color: "#F5DD06" },
  { name: "Orange", color: "#F57906" },
  { name: "Sky", color: "#06CAF5" },
  { name: "Blue", color: "#063AF5" },
  { name: "Purple", color: "#7D06F5" },
  { name: "Pink", color: "#F506A4" },
  { name: "White", color: "#FFFFFF", light: true },
  { name: "Black", color: "#000000" },
];

export function ShopFilterSidebar({ isMobileSheet = false }: { isMobileSheet?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentDressStyle = searchParams.get("dressStyle") || "";
  const currentMinPrice = searchParams.get("minPrice") || "50";
  const currentMaxPrice = searchParams.get("maxPrice") || "300";
  const currentSize = searchParams.get("size") || "";
  const currentColor = searchParams.get("color") || "";

  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);
  const [selectedSize, setSelectedSize] = useState(currentSize);
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const [mobileOpen, setMobileOpen] = useState(false);

  const applyFilters = (overrides: Record<string, string> = {}) => {
    const params = new URLSearchParams(searchParams.toString());

    const categoryVal = overrides.category !== undefined ? overrides.category : currentCategory;
    const dressStyleVal = overrides.dressStyle !== undefined ? overrides.dressStyle : currentDressStyle;
    const sizeVal = overrides.size !== undefined ? overrides.size : selectedSize;
    const colorVal = overrides.color !== undefined ? overrides.color : selectedColor;
    const minVal = overrides.minPrice !== undefined ? overrides.minPrice : minPrice;
    const maxVal = overrides.maxPrice !== undefined ? overrides.maxPrice : maxPrice;

    if (categoryVal) params.set("category", categoryVal);
    else params.delete("category");

    if (dressStyleVal) params.set("dressStyle", dressStyleVal);
    else params.delete("dressStyle");

    if (sizeVal) params.set("size", sizeVal);
    else params.delete("size");

    if (colorVal) params.set("color", colorVal);
    else params.delete("color");

    if (minVal) params.set("minPrice", minVal);
    if (maxVal) params.set("maxPrice", maxVal);

    params.delete("page"); // Reset pagination on filter change
    router.push(`/shop?${params.toString()}`);
    setMobileOpen(false);
  };

  const clearAllFilters = () => {
    router.push("/shop");
    setMinPrice("50");
    setMaxPrice("300");
    setSelectedSize("");
    setSelectedColor("");
    setMobileOpen(false);
  };

  const content = (
    <div className="space-y-6">
      {/* Categories Accordion */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-black">Categories</h3>
        <div className="space-y-2 text-sm text-black/60">
          {categoryLinks.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => applyFilters({ category: cat.value })}
              className={cn(
                "flex w-full items-center justify-between py-1 text-left transition hover:text-black cursor-pointer",
                currentCategory === cat.value && "font-bold text-black"
              )}
            >
              <span>{cat.label}</span>
              <ChevronRight className="size-4 opacity-50" />
            </button>
          ))}
        </div>
      </div>

      <Separator className="bg-black/10" />

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-black">Price Range</h3>
          <span className="text-xs font-semibold text-black/60">
            ${minPrice} - ${maxPrice}
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <input
            type="range"
            min="20"
            max="400"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full accent-black cursor-pointer"
          />
        </div>
      </div>

      <Separator className="bg-black/10" />

      {/* Colors */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-black">Colors</h3>
        <div className="grid grid-cols-5 gap-3">
          {colorDots.map((dot) => (
            <button
              key={dot.name}
              type="button"
              onClick={() => {
                const nextColor = selectedColor === dot.name ? "" : dot.name;
                setSelectedColor(nextColor);
                applyFilters({ color: nextColor });
              }}
              title={dot.name}
              aria-label={`Filter by ${dot.name}`}
              className={cn(
                "flex size-[36px] items-center justify-center rounded-full transition cursor-pointer hover:scale-110",
                dot.light && "border border-black/20",
                selectedColor === dot.name && "ring-2 ring-black ring-offset-2"
              )}
              style={{ backgroundColor: dot.color }}
            >
              {selectedColor === dot.name ? (
                <Check className={cn("size-4.5", dot.light ? "text-black" : "text-white")} strokeWidth={3} />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <Separator className="bg-black/10" />

      {/* Size Chips */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-black">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizeChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => {
                const nextSize = selectedSize === chip ? "" : chip;
                setSelectedSize(nextSize);
                applyFilters({ size: nextSize });
              }}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-medium transition cursor-pointer",
                selectedSize === chip
                  ? "bg-black text-white"
                  : "bg-[#F0F0F0] text-black/60 hover:text-black hover:bg-[#e4e4e4]"
              )}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <Separator className="bg-black/10" />

      {/* Dress Style */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-black">Dress Style</h3>
        <div className="space-y-2 text-sm text-black/60">
          {dressStyles.map((style) => (
            <button
              key={style.label}
              type="button"
              onClick={() => applyFilters({ dressStyle: style.value })}
              className={cn(
                "flex w-full items-center justify-between py-1 text-left transition hover:text-black cursor-pointer",
                currentDressStyle === style.value && "font-bold text-black"
              )}
            >
              <span>{style.label}</span>
              <ChevronRight className="size-4 opacity-50" />
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={() => applyFilters()}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/90 cursor-pointer shadow-md"
        >
          Apply Filter
        </button>

        {(currentCategory || currentDressStyle || selectedSize || selectedColor || currentMaxPrice !== "300") && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex h-10 w-full items-center justify-center rounded-full border border-black/10 text-xs font-medium text-black/70 hover:text-black hover:bg-black/5 transition cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );

  if (isMobileSheet) {
    return (
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger
          render={
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-full bg-[#F0F0F0] text-black hover:bg-[#e4e4e4] transition lg:hidden cursor-pointer"
              aria-label="Open filter options"
            >
              <SlidersHorizontal className="size-5" />
            </button>
          }
        />
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-3xl p-6">
          <SheetHeader className="text-left mb-4">
            <SheetTitle className="font-heading text-xl font-bold flex items-center justify-between">
              <span>Filters</span>
              <SlidersHorizontal className="size-5 text-black/40" />
            </SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="rounded-[20px] border border-black/10 p-5 sm:p-6 bg-white shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-black/10">
        <h2 className="text-xl font-bold leading-none text-black">Filters</h2>
        <SlidersHorizontal className="size-5 text-black/40" />
      </div>
      <div className="pt-4">{content}</div>
    </aside>
  );
}

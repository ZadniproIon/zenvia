import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function downloadFile(url: string, destPath: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    return true;
  } catch (err) {
    console.warn(`Failed to download ${url}:`, err);
    return false;
  }
}

async function main() {
  console.log("Setting up categories...");
  
  // Ensure all categories exist
  const categoriesToEnsure = [
    { name: "Shoes", slug: "shoes", description: "Iconic sneakers, running shoes, and luxury leather footwear." },
    { name: "Hoodie", slug: "hoodie", description: "Heavyweight fleece pullovers and oversized streetwear hoodies." },
    { name: "Shirts", slug: "shirts", description: "Oxford button-downs, casual checkered, and striped shirts." },
    { name: "T-shirts", slug: "t-shirts", description: "Everyday crewnecks, graphic tees, and heavyweight basics." },
    { name: "Jeans", slug: "jeans", description: "Skinny, straight-leg, and relaxed denim silhouettes." },
    { name: "Shorts", slug: "shorts", description: "Summer shorts, bermudas, and casual activewear." },
  ];

  const categoryMap: Record<string, string> = {};

  for (const cat of categoriesToEnsure) {
    let existing = await prisma.category.findUnique({ where: { slug: cat.slug } });
    if (!existing) {
      existing = await prisma.category.create({ data: cat });
    }
    categoryMap[cat.slug] = existing.id;
  }

  // Create directories in public/products
  const subdirs = ["shoes", "hoodies", "shirts", "pants"];
  for (const sub of subdirs) {
    const p = path.join(process.cwd(), "public", "products", sub);
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  }

  // Curated list of exact studio cutout products
  const curatedProducts = [
    // === SHOES & SNEAKERS ===
    {
      name: "Nike Air Jordan 1 Retro High 'Chicago'",
      brand: "Nike",
      categorySlug: "shoes",
      dressStyle: "Casual",
      price: 180,
      originalPrice: 210,
      discount: "-15%",
      description: "The sneaker that started it all. Premium red and white leather upper with bold black Swoosh branding, perforated toe box, and encapsulated Air-Sole cushioning.",
      remoteImages: [
        "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp",
        "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/2.webp",
        "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/3.webp",
        "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/4.webp"
      ],
      localPrefix: "shoes/jordan-1-chicago",
      stock: 14,
      rating: 4.9,
      reviewCount: 380,
      sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
      colors: [
        { name: "Chicago Red", value: "#C62828" },
        { name: "White", value: "#FFFFFF" },
        { name: "Black", value: "#000000" }
      ],
      isNewArrival: true,
      isTopSelling: true,
      reviews: [
        { userName: "Tyler M.", rating: 5, comment: "Grail sneaker. Leather is soft and comfortable for daily wear." },
        { userName: "Jordan K.", rating: 5, comment: "True classic. Looks incredible on feet with denim or cargo pants." }
      ]
    },
    {
      name: "Puma Future Rider Two-Tone Trainers",
      brand: "Puma",
      categorySlug: "shoes",
      dressStyle: "Gym",
      price: 90,
      originalPrice: 110,
      discount: "-18%",
      description: "Retro 80s running silhouette modernized with lightweight nylon upper, suede overlays, and shock-absorbing Rider Foam outsole.",
      remoteImages: [
        "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/1.webp",
        "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/2.webp"
      ],
      localPrefix: "shoes/puma-future-rider",
      stock: 25,
      rating: 4.6,
      reviewCount: 95,
      sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
      colors: [
        { name: "Multi-Color", value: "#0288D1" },
        { name: "White", value: "#FFFFFF" }
      ],
      isNewArrival: true,
      isTopSelling: false,
      reviews: [
        { userName: "Leo B.", rating: 4.5, comment: "Super lightweight, great walking shoe." }
      ]
    },
    {
      name: "Off-White Industrial Low-Top Street Sneakers",
      brand: "Off-White",
      categorySlug: "shoes",
      dressStyle: "Party",
      price: 340,
      originalPrice: 420,
      discount: "-19%",
      description: "Virgil Abloh's signature deconstructed luxury aesthetic featuring contrast arrow motifs, ribbed rubber sole, and branded signature hangtag.",
      remoteImages: [
        "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/1.webp",
        "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/2.webp"
      ],
      localPrefix: "shoes/off-white-sneakers",
      stock: 8,
      rating: 4.8,
      reviewCount: 110,
      sizes: ["US 8", "US 9", "US 10", "US 11"],
      colors: [
        { name: "Off White / Red", value: "#E0E0E0" },
        { name: "Red", value: "#D32F2F" }
      ],
      isNewArrival: false,
      isTopSelling: true,
      reviews: [
        { userName: "Marcus D.", rating: 5, comment: "Showstopper sneakers. Amazing quality craftsmanship." }
      ]
    },
    {
      name: "Calvin Klein Pointed Toe Leather Pumps",
      brand: "Calvin Klein",
      categorySlug: "shoes",
      dressStyle: "Formal",
      price: 135,
      originalPrice: 170,
      discount: "-20%",
      description: "Sophisticated stiletto pumps tailored in polished genuine leather with memory foam padded footbed for all-evening comfort.",
      remoteImages: [
        "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/1.webp",
        "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/2.webp"
      ],
      localPrefix: "shoes/ck-leather-pumps",
      stock: 12,
      rating: 4.7,
      reviewCount: 74,
      sizes: ["US 6", "US 7", "US 8", "US 9"],
      colors: [
        { name: "Nude Leather", value: "#E8CBB8" },
        { name: "Midnight Black", value: "#1A1A1A" }
      ],
      isNewArrival: false,
      isTopSelling: false,
      reviews: [
        { userName: "Elena R.", rating: 5, comment: "Extremely comfortable for formal occasions and work." }
      ]
    },

    // === HOODIES ===
    {
      name: "Heavyweight Boxy Fleece Hoodie (Ruby Red)",
      brand: "Zenvia",
      categorySlug: "hoodie",
      dressStyle: "Casual",
      price: 125,
      originalPrice: 150,
      discount: "-16%",
      description: "400 GSM custom-knit brushed organic cotton hoodie in rich ruby red. Features double-layered structured hood, seamless ribbed cuffs, and spacious kangaroo pouch.",
      remoteImages: [
        "https://i.imgur.com/1twoaDy.jpeg",
        "https://i.imgur.com/FDwQgLy.jpeg"
      ],
      localPrefix: "hoodies/heavyweight-hoodie-red",
      stock: 20,
      rating: 4.8,
      reviewCount: 165,
      sizes: ["Small", "Medium", "Large", "X-Large"],
      colors: [
        { name: "Ruby Red", value: "#D32F2F" },
        { name: "Charcoal", value: "#262626" }
      ],
      isNewArrival: true,
      isTopSelling: true,
      reviews: [
        { userName: "Sarah M.", rating: 5, comment: "The thickness of this cotton is incredible. Fits oversized without looking sloppy." }
      ]
    },
    {
      name: "Minimalist Slate Grey Drawstring Hoodie",
      brand: "Zenvia",
      categorySlug: "hoodie",
      dressStyle: "Casual",
      price: 115,
      originalPrice: null,
      discount: null,
      description: "Clean aesthetic midweight sweatshirt constructed with flatlock stitching, contrast raw cotton drawstrings, and loopback French terry interior.",
      remoteImages: [
        "https://i.imgur.com/R2PN9Wq.jpeg"
      ],
      localPrefix: "hoodies/minimalist-hoodie-grey",
      stock: 24,
      rating: 4.7,
      reviewCount: 92,
      sizes: ["Small", "Medium", "Large", "X-Large"],
      colors: [
        { name: "Slate Grey", value: "#616161" },
        { name: "Bone White", value: "#F5F5F0" }
      ],
      isNewArrival: true,
      isTopSelling: false,
      reviews: [
        { userName: "Alex K.", rating: 5, comment: "My go-to everyday hoodie. Very soft fabric." }
      ]
    },

    // === SHIRTS & PANTS ===
    {
      name: "Classic Indigo Check Flannel Shirt",
      brand: "Zenvia",
      categorySlug: "shirts",
      dressStyle: "Casual",
      price: 85,
      originalPrice: 105,
      discount: "-19%",
      description: "Heavyweight brushed cotton flannel woven in a rich blue and black check pattern. Finished with button-down collar and chest pocket.",
      remoteImages: [
        "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
        "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/2.webp"
      ],
      localPrefix: "shirts/blue-black-check-shirt",
      stock: 18,
      rating: 4.5,
      reviewCount: 68,
      sizes: ["Small", "Medium", "Large", "X-Large"],
      colors: [
        { name: "Indigo / Black", value: "#1A237E" },
        { name: "Forest / Black", value: "#1B5E20" }
      ],
      isNewArrival: false,
      isTopSelling: true,
      reviews: [
        { userName: "James T.", rating: 4.5, comment: "Warm and cozy. Perfect layer over a t-shirt." }
      ]
    },
    {
      name: "Tailored Slim Fit Drawstring Joggers",
      brand: "Zenvia",
      categorySlug: "jeans",
      dressStyle: "Casual",
      price: 95,
      originalPrice: null,
      discount: null,
      description: "Elevated athletic trousers tailored in dense stretch-cotton knit. Features zippered side pockets, tapered ankle cuffs, and reinforced waistband.",
      remoteImages: [
        "https://i.imgur.com/ZKGofuB.jpeg",
        "https://i.imgur.com/GJi73H0.jpeg"
      ],
      localPrefix: "pants/comfort-fit-joggers",
      stock: 30,
      rating: 4.6,
      reviewCount: 140,
      sizes: ["Small", "Medium", "Large", "X-Large"],
      colors: [
        { name: "Heather Grey", value: "#757575" },
        { name: "Black", value: "#111111" }
      ],
      isNewArrival: false,
      isTopSelling: true,
      reviews: [
        { userName: "Lucas P.", rating: 5, comment: "Extremely comfortable yet tailored enough to wear out." }
      ]
    }
  ];

  console.log(`Processing ${curatedProducts.length} studio cutout products...`);

  for (const item of curatedProducts) {
    const downloadedImages: string[] = [];

    // Download each angle/gallery image
    for (let idx = 0; idx < item.remoteImages.length; idx++) {
      const ext = path.extname(item.remoteImages[idx].split("?")[0]) || ".webp";
      const filename = `${item.localPrefix}-${idx + 1}${ext}`;
      const localFilePath = path.join(process.cwd(), "public", "products", filename);

      if (!fs.existsSync(localFilePath)) {
        console.log(`Downloading ${item.name} (image ${idx + 1})...`);
        const ok = await downloadFile(item.remoteImages[idx], localFilePath);
        if (ok) downloadedImages.push(`/products/${filename}`);
      } else {
        downloadedImages.push(`/products/${filename}`);
      }
    }

    const mainImage = downloadedImages[0] || "/figma-product/product-main.png";

    // Upsert product in PostgreSQL
    const existing = await prisma.product.findFirst({
      where: { name: item.name }
    });

    const productData = {
      name: item.name,
      brand: item.brand,
      description: item.description,
      price: item.price,
      originalPrice: item.originalPrice,
      discount: item.discount,
      image: mainImage,
      galleryImages: JSON.stringify(downloadedImages),
      stock: item.stock,
      rating: item.rating,
      reviewCount: item.reviewCount,
      dressStyle: item.dressStyle,
      categoryId: categoryMap[item.categorySlug],
      sizes: JSON.stringify(item.sizes),
      colors: JSON.stringify(item.colors),
      isNewArrival: item.isNewArrival,
      isTopSelling: item.isTopSelling,
    };

    let product;
    if (existing) {
      product = await prisma.product.update({
        where: { id: existing.id },
        data: productData
      });
      console.log(`✓ Updated: [${item.brand}] ${item.name}`);
    } else {
      product = await prisma.product.create({
        data: productData
      });
      console.log(`✓ Created: [${item.brand}] ${item.name}`);
    }

    // Add customer reviews
    for (const rev of item.reviews) {
      await prisma.review.create({
        data: {
          productId: product.id,
          userName: rev.userName,
          rating: rev.rating,
          comment: rev.comment,
          verified: true
        }
      });
    }
  }

  console.log("✅ Successfully imported all studio cutout products!");
}

main()
  .catch((e) => {
    console.error("Import failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

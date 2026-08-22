import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const hoodiesData = [
  {
    brand: "Nike",
    name: "Nike Sportswear Club Fleece Hoodie",
    description: "A wardrobe staple, the Nike Sportswear Club Fleece Pullover combines classic style with the soft comfort of brushed-back fleece. Features an adjustable drawstring hood and kangaroo pocket.",
    price: 65,
    originalPrice: 75,
    discount: "-13%",
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    filename: "nike-club-fleece-black.jpg",
    dressStyle: "Gym",
    stock: 35,
    rating: 4.8,
    reviewCount: 312,
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Dark Grey Heather", value: "#4A4A4A" },
      { name: "Midnight Navy", value: "#14213D" }
    ],
    reviews: [
      {
        userName: "Marcus V.",
        rating: 5,
        comment: "Classic Nike fleece comfort. Fits true to size and holds up great in the wash."
      },
      {
        userName: "David L.",
        rating: 4.5,
        comment: "Great quality for workouts and casual wear. Very soft interior."
      }
    ]
  },
  {
    brand: "Essentials",
    name: "Fear of God Essentials Oatmeal Heavy Hoodie",
    description: "Crafted from 380 GSM heavyweight cotton-blend fleece. Relaxed, dropped-shoulder silhouette with minimalist rubberized logo lettering across the back and on the hood.",
    price: 130,
    originalPrice: 160,
    discount: "-18%",
    imageUrl: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
    filename: "essentials-oatmeal-hoodie.jpg",
    dressStyle: "Casual",
    stock: 18,
    rating: 4.9,
    reviewCount: 420,
    sizes: ["Small", "Medium", "Large", "X-Large"],
    colors: [
      { name: "Oatmeal Heather", value: "#D8D4CE" },
      { name: "Desert Taupe", value: "#B7A896" },
      { name: "Off Black", value: "#232323" }
    ],
    reviews: [
      {
        userName: "Chloe N.",
        rating: 5,
        comment: "The heavyweight structure is insane. The hood sits perfectly without slumping."
      },
      {
        userName: "Julian B.",
        rating: 5,
        comment: "Best oversized fit on the market. Worth every penny."
      }
    ]
  },
  {
    brand: "Carhartt WIP",
    name: "Carhartt WIP Chase Heavyweight Pullover",
    description: "Constructed from a heavyweight 13oz cotton-poly jersey with brushed interior for extra softness. Features subtle golden 'C' embroidery on the left sleeve cuff.",
    price: 110,
    originalPrice: null,
    discount: null,
    imageUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
    filename: "carhartt-wip-chase-green.jpg",
    dressStyle: "Casual",
    stock: 22,
    rating: 4.7,
    reviewCount: 154,
    sizes: ["Small", "Medium", "Large", "X-Large"],
    colors: [
      { name: "Thyme Green", value: "#586851" },
      { name: "Carhartt Brown", value: "#8B5A2B" },
      { name: "Ash Heather", value: "#CBCBCB" }
    ],
    reviews: [
      {
        userName: "Ethan K.",
        rating: 4.5,
        comment: "Durable construction. It feels like it will last 10 years."
      }
    ]
  },
  {
    brand: "Stüssy",
    name: "Stüssy 8-Ball Graphic Pigment Dyed Hoodie",
    description: "Streetwear icon featuring the signature Stüssy 8-Ball graphic screenprinted on the back. Pigment dyed for a vintage, broken-in aesthetic.",
    price: 150,
    originalPrice: 175,
    discount: "-14%",
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    filename: "stussy-8ball-hoodie.jpg",
    dressStyle: "Party",
    stock: 14,
    rating: 4.8,
    reviewCount: 260,
    sizes: ["Small", "Medium", "Large", "X-Large"],
    colors: [
      { name: "Washed Berry", value: "#6B3045" },
      { name: "Washed Black", value: "#1F1F1F" },
      { name: "Natural Bone", value: "#EDE6D6" }
    ],
    reviews: [
      {
        userName: "Tyler P.",
        rating: 5,
        comment: "The graphic and vintage wash are top tier. Gets compliments constantly."
      }
    ]
  },
  {
    brand: "Adidas",
    name: "Adidas Originals Trefoil Adicolor Hoodie",
    description: "Classic retro athletic silhouette made in soft cotton French terry. Boasts the oversized Trefoil logo emblazoned across the front.",
    price: 70,
    originalPrice: 85,
    discount: "-17%",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    filename: "adidas-trefoil-hoodie.jpg",
    dressStyle: "Gym",
    stock: 28,
    rating: 4.6,
    reviewCount: 190,
    sizes: ["Small", "Medium", "Large", "X-Large"],
    colors: [
      { name: "Night Indigo", value: "#1E2A4A" },
      { name: "Scarlet Red", value: "#C62828" },
      { name: "Core White", value: "#FAFAFA" }
    ],
    reviews: [
      {
        userName: "Lucas R.",
        rating: 4.5,
        comment: "Super comfortable for layering or lounging. Authentic heritage style."
      }
    ]
  },
  {
    brand: "Calvin Klein",
    name: "Calvin Klein Modern Cotton Monogram Hoodie",
    description: "Elevated minimal lounge hoodie with signature CK monogram embroidery on the chest. Tailored in breathable compact cotton loopback.",
    price: 115,
    originalPrice: 140,
    discount: "-18%",
    imageUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    filename: "calvin-klein-monogram-hoodie.jpg",
    dressStyle: "Casual",
    stock: 19,
    rating: 4.7,
    reviewCount: 115,
    sizes: ["Small", "Medium", "Large", "X-Large"],
    colors: [
      { name: "Chalk Heather", value: "#E4E3DF" },
      { name: "Calvin Black", value: "#0A0A0A" }
    ],
    reviews: [
      {
        userName: "Sophie H.",
        rating: 5,
        comment: "Clean lines, subtle branding, luxury feel against the skin."
      }
    ]
  }
];

async function downloadImage(url: string, destPath: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    console.log(`✓ Downloaded image to ${destPath}`);
  } catch (err) {
    console.warn(`Failed to download ${url}, falling back to placeholder`, err);
  }
}

async function main() {
  console.log("Checking Hoodie category...");
  let hoodieCat = await prisma.category.findUnique({
    where: { slug: "hoodie" }
  });

  if (!hoodieCat) {
    hoodieCat = await prisma.category.create({
      data: {
        name: "Hoodie",
        slug: "hoodie",
        description: "Cozy fleece pullovers and oversized premium streetwear."
      }
    });
  }

  const targetDir = path.join(process.cwd(), "public", "products", "hoodies");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`Importing ${hoodiesData.length} brand hoodies...`);

  for (const item of hoodiesData) {
    const localFilePath = path.join(targetDir, item.filename);
    const publicUrl = `/products/hoodies/${item.filename}`;

    // Download image if not already cached locally
    if (!fs.existsSync(localFilePath)) {
      console.log(`Downloading ${item.brand} image: ${item.name}...`);
      await downloadImage(item.imageUrl, localFilePath);
    }

    const imageToUse = fs.existsSync(localFilePath) ? publicUrl : "/figma-home/asset-11.png";

    // Upsert or create product
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
      image: imageToUse,
      galleryImages: JSON.stringify([imageToUse]),
      stock: item.stock,
      rating: item.rating,
      reviewCount: item.reviewCount,
      dressStyle: item.dressStyle,
      categoryId: hoodieCat.id,
      sizes: JSON.stringify(item.sizes),
      colors: JSON.stringify(item.colors),
      isNewArrival: true,
      isTopSelling: item.price > 100
    };

    let product;
    if (existing) {
      product = await prisma.product.update({
        where: { id: existing.id },
        data: productData
      });
      console.log(`Updated product: ${item.brand} - ${item.name}`);
    } else {
      product = await prisma.product.create({
        data: productData
      });
      console.log(`Created product: ${item.brand} - ${item.name}`);
    }

    // Insert reviews if none exist
    const existingReviews = await prisma.review.count({ where: { productId: product.id } });
    if (existingReviews === 0 && item.reviews) {
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
  }

  console.log("✅ Successfully imported and seeded brand hoodies!");
}

main()
  .catch((e) => {
    console.error("Error importing hoodies:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

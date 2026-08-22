import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("1. Deleting ALL products, reviews, and order items from database...");
  await prisma.review.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.product.deleteMany({});

  console.log("2. Ensuring Hoodie category exists...");
  let hoodieCat = await prisma.category.findUnique({
    where: { slug: "hoodie" }
  });

  if (!hoodieCat) {
    hoodieCat = await prisma.category.create({
      data: {
        name: "Hoodie",
        slug: "hoodie",
        description: "Heavyweight fleece pullovers and luxury streetwear hoodies."
      }
    });
  }

  const hoodies = [
    {
      name: "Nike Club Fleece Vintage Washed Hoodie",
      brand: "Nike",
      description: "A streetwear essential tailored in 380 GSM brushed-back cotton fleece in a distinctive washed sage green tone. Features a structured drawstring hood, subtle embroidered mini Swoosh on the left chest, seamless ribbed cuffs, and a deep kangaroo pocket.",
      price: 120,
      originalPrice: 150,
      discount: "-20%",
      image: "/products/hoodies/nike-club-fleece-front.jpg",
      galleryImages: JSON.stringify([
        "/products/hoodies/nike-club-fleece-front.jpg",
        "/products/hoodies/nike-club-fleece-back.jpg",
        "/products/hoodies/nike-club-fleece-model-1.jpg",
        "/products/hoodies/nike-club-fleece-model-2.jpg"
      ]),
      rating: 4.8,
      reviewCount: 340,
      stock: 24,
      categoryId: hoodieCat.id,
      dressStyle: "Casual",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large", "XX-Large"]),
      colors: JSON.stringify([
        { name: "Sage Green", value: "#8FA382" },
        { name: "Vintage Black", value: "#2B2B2B" },
        { name: "Heather Grey", value: "#B0B0B0" }
      ]),
      isNewArrival: true,
      isTopSelling: true,
      reviews: [
        {
          userName: "Marcus V.",
          rating: 5,
          comment: "The sage green color is even better in person. Thick fleece that holds its shape wash after wash.",
          verified: true
        },
        {
          userName: "Elena R.",
          rating: 4.5,
          comment: "Super comfortable for everyday wear. The hood has great structure.",
          verified: true
        }
      ]
    },
    {
      name: "Fear of God Essentials Heavyweight Oatmeal Pullover",
      brand: "Essentials",
      description: "Crafted from 400 GSM custom-milled heavyweight organic cotton fleece in signature heather oatmeal. Cut in an oversized, dropped-shoulder boxy silhouette with rubberized minimalist logo lettering on the left chest and bold 'ESSENTIALS' across the upper back.",
      price: 160,
      originalPrice: 190,
      discount: "-15%",
      image: "/products/hoodies/essentials-oatmeal-front.jpg",
      galleryImages: JSON.stringify([
        "/products/hoodies/essentials-oatmeal-front.jpg",
        "/products/hoodies/essentials-oatmeal-back.jpg",
        "/products/hoodies/essentials-oatmeal-model-1.jpg",
        "/products/hoodies/essentials-oatmeal-model-2.jpg"
      ]),
      rating: 4.9,
      reviewCount: 512,
      stock: 18,
      categoryId: hoodieCat.id,
      dressStyle: "Casual",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Heather Oatmeal", value: "#D9D2C7" },
        { name: "Off Black", value: "#1F1F1F" },
        { name: "Desert Taupe", value: "#B8A99A" }
      ]),
      isNewArrival: true,
      isTopSelling: true,
      reviews: [
        {
          userName: "Chloe N.",
          rating: 5,
          comment: "The boxy cut is perfection. Doesn't bunch at the bottom and the hood stands tall without strings.",
          verified: true
        },
        {
          userName: "Julian B.",
          rating: 5,
          comment: "High fashion drape at a great price point. My favorite hoodie in the rotation.",
          verified: true
        }
      ]
    },
    {
      name: "Stüssy 8-Ball Vintage Pigment-Dyed Hoodie",
      brand: "Stüssy",
      description: "Iconic streetwear staple crafted from heavyweight 100% dry-touch cotton with a vintage charcoal wash. Boasts subtle handwritten script logo on the front chest and the legendary flaming 8-ball graphic screenprinted across the full back.",
      price: 145,
      originalPrice: null,
      discount: null,
      image: "/products/hoodies/stussy-8ball-front.jpg",
      galleryImages: JSON.stringify([
        "/products/hoodies/stussy-8ball-front.jpg",
        "/products/hoodies/stussy-8ball-back.jpg",
        "/products/hoodies/stussy-8ball-model-1.jpg",
        "/products/hoodies/stussy-8ball-model-2.jpg"
      ]),
      rating: 4.9,
      reviewCount: 428,
      stock: 15,
      categoryId: hoodieCat.id,
      dressStyle: "Party",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: [
        { name: "Washed Charcoal", value: "#262626" },
        { name: "Natural Bone", value: "#EAE5D9" },
        { name: "Faded Berry", value: "#6B3349" }
      ],
      isNewArrival: true,
      isTopSelling: true,
      reviews: [
        {
          userName: "Tyler P.",
          rating: 5,
          comment: "The 8-ball graphic is iconic. The pigment dye gives it that coveted broken-in feel straight out of the box.",
          verified: true
        },
        {
          userName: "Sarah M.",
          rating: 5,
          comment: "Insanely clean graphic and high quality heavyweight cotton.",
          verified: true
        }
      ]
    }
  ];

  console.log("3. Seeding 3 brand hoodies with 4 high-res photos each...");

  for (const h of hoodies) {
    const product = await prisma.product.create({
      data: {
        name: h.name,
        brand: h.brand,
        description: h.description,
        price: h.price,
        originalPrice: h.originalPrice,
        discount: h.discount,
        image: h.image,
        galleryImages: h.galleryImages,
        rating: h.rating,
        reviewCount: h.reviewCount,
        stock: h.stock,
        categoryId: h.categoryId,
        dressStyle: h.dressStyle,
        sizes: h.sizes,
        colors: JSON.stringify(h.colors),
        isNewArrival: h.isNewArrival,
        isTopSelling: h.isTopSelling,
      }
    });

    for (const r of h.reviews) {
      await prisma.review.create({
        data: {
          productId: product.id,
          userName: r.userName,
          rating: r.rating,
          comment: r.comment,
          verified: r.verified
        }
      });
    }

    console.log(`✓ Seeded: [${h.brand}] ${h.name} (4 images & ${h.reviews.length} reviews)`);
  }

  console.log("🎉 Successfully cleared old catalog and seeded 3 brand hoodies!");
}

main()
  .catch((e) => {
    console.error("Error in reset script:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

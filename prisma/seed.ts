import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing old data...')
  await prisma.review.deleteMany({})
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('Seeding Categories...')
  const tshirts = await prisma.category.create({
    data: { name: 'T-shirts', slug: 't-shirts', description: 'Everyday crewnecks, graphic tees, and heavyweight basics.' }
  })
  const shirts = await prisma.category.create({
    data: { name: 'Shirts', slug: 'shirts', description: 'Oxford button-downs, casual checkered, and striped shirts.' }
  })
  const jeans = await prisma.category.create({
    data: { name: 'Jeans', slug: 'jeans', description: 'Skinny, straight-leg, and relaxed denim silhouettes.' }
  })
  const shorts = await prisma.category.create({
    data: { name: 'Shorts', slug: 'shorts', description: 'Summer shorts, bermudas, and casual activewear.' }
  })
  const hoodies = await prisma.category.create({
    data: { name: 'Hoodie', slug: 'hoodie', description: 'Cozy fleece pullovers and oversized premium streetwear.' }
  })
  const shoes = await prisma.category.create({
    data: { name: 'Shoes', slug: 'shoes', description: 'Iconic sneakers, running shoes, and luxury leather footwear.' }
  })

  console.log('Seeding Users...')
  const admin = await prisma.user.create({
    data: {
      email: 'admin@zenvia.com',
      password: 'password',
      name: 'Admin User',
      role: 'ADMIN'
    }
  })
  const demoUser = await prisma.user.create({
    data: {
      email: 'sarah.miller@example.com',
      password: 'password',
      name: 'Sarah Miller',
      role: 'USER'
    }
  })

  console.log('Seeding 20+ Products with rich details...')
  const productsData = [
    {
      name: "One Life Graphic T-shirt",
      description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
      price: 260,
      originalPrice: 300,
      discount: "-40%",
      image: "/figma-product/product-main.png",
      galleryImages: JSON.stringify([
        "/figma-product/product-main.png",
        "/figma-product/product-thumb-2.png",
        "/figma-product/product-thumb-3.png"
      ]),
      rating: 4.5,
      reviewCount: 451,
      stock: 25,
      categoryId: tshirts.id,
      dressStyle: "Casual",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Olive", value: "#4F5B37" },
        { name: "Forest", value: "#314F4A" },
        { name: "Indigo", value: "#31344F" }
      ]),
      isNewArrival: true,
      isTopSelling: true,
      reviews: [
        {
          userName: "Samantha D.",
          rating: 4.5,
          comment: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
          verified: true
        },
        {
          userName: "Alex M.",
          rating: 5.0,
          comment: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
          verified: true
        },
        {
          userName: "Ethan R.",
          rating: 4.0,
          comment: "This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye, and the fit is perfect.",
          verified: true
        },
        {
          userName: "Olivia P.",
          rating: 4.5,
          comment: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear.",
          verified: true
        },
        {
          userName: "Liam K.",
          rating: 4.0,
          comment: "This shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill.",
          verified: true
        },
        {
          userName: "Ava H.",
          rating: 5.0,
          comment: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout make this shirt a conversation starter.",
          verified: true
        }
      ]
    },
    {
      name: "T-shirt with Tape Details",
      description: "Signature streetwear tee with modern contrast tape details along the shoulders and sleeves. Made with 100% combed organic cotton.",
      price: 120,
      originalPrice: null,
      discount: null,
      image: "/figma-home/new-1.png",
      galleryImages: JSON.stringify(["/figma-home/new-1.png"]),
      rating: 4.5,
      reviewCount: 120,
      stock: 18,
      categoryId: tshirts.id,
      dressStyle: "Casual",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" }
      ]),
      isNewArrival: true,
      isTopSelling: false,
      reviews: [
        {
          userName: "Marcus B.",
          rating: 4.5,
          comment: "Great fit around the shoulders, very breathable material.",
          verified: true
        }
      ]
    },
    {
      name: "Skinny Fit Jeans",
      description: "Modern stretch-denim skinny jeans with slight distressing. Form-fitting yet incredibly comfortable for day-to-night wear.",
      price: 240,
      originalPrice: 260,
      discount: "-20%",
      image: "/figma-home/new-2.png",
      galleryImages: JSON.stringify(["/figma-home/new-2.png", "/figma-store/product-4.png"]),
      rating: 3.5,
      reviewCount: 88,
      stock: 14,
      categoryId: jeans.id,
      dressStyle: "Casual",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Denim Blue", value: "#2B4C7E" },
        { name: "Washed Black", value: "#1E1E1E" }
      ]),
      isNewArrival: true,
      isTopSelling: false,
      reviews: [
        {
          userName: "David K.",
          rating: 3.5,
          comment: "A bit tighter than expected, but the stretch denim makes up for it.",
          verified: true
        }
      ]
    },
    {
      name: "Checkered Shirt",
      description: "Classic flannel checkered button-up shirt. Perfect for layering over graphic tees or wearing buttoned up for a polished casual look.",
      price: 180,
      originalPrice: null,
      discount: null,
      image: "/figma-home/new-3.png",
      galleryImages: JSON.stringify(["/figma-home/new-3.png", "/figma-store/product-5.png"]),
      rating: 4.5,
      reviewCount: 95,
      stock: 22,
      categoryId: shirts.id,
      dressStyle: "Casual",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Red/Navy Plaid", value: "#7B1113" },
        { name: "Green Plaid", value: "#1D4E3A" }
      ]),
      isNewArrival: true,
      isTopSelling: false,
      reviews: [
        {
          userName: "Jordan T.",
          rating: 5.0,
          comment: "Super warm and heavyweight. The colors are rich and haven't faded after multiple washes.",
          verified: true
        }
      ]
    },
    {
      name: "Sleeve Striped T-shirt",
      description: "Athletic-inspired raglan tee featuring contrast striped sleeves and an embroidered heritage chest logo.",
      price: 130,
      originalPrice: 160,
      discount: "-30%",
      image: "/figma-home/new-4.png",
      galleryImages: JSON.stringify(["/figma-home/new-4.png", "/figma-store/product-6.png"]),
      rating: 4.5,
      reviewCount: 64,
      stock: 30,
      categoryId: tshirts.id,
      dressStyle: "Gym",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large", "XX-Large"]),
      colors: JSON.stringify([
        { name: "Orange/Black", value: "#E65100" },
        { name: "White/Black", value: "#FFFFFF" }
      ]),
      isNewArrival: true,
      isTopSelling: false,
      reviews: [
        {
          userName: "Carlos N.",
          rating: 4.5,
          comment: "High quality gym and lifestyle shirt. Highly recommend!",
          verified: true
        }
      ]
    },
    {
      name: "Vertical Striped Shirt",
      description: "Sophisticated vertical stripe dress shirt tailored in lightweight linen-blend fabric. Ideal for smart-casual events and warm evenings.",
      price: 212,
      originalPrice: 232,
      discount: "-20%",
      image: "/figma-home/top-1.png",
      galleryImages: JSON.stringify(["/figma-home/top-1.png", "/figma-store/product-7.png"]),
      rating: 5.0,
      reviewCount: 142,
      stock: 12,
      categoryId: shirts.id,
      dressStyle: "Formal",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Olive Green", value: "#385E38" },
        { name: "Sky Blue", value: "#5B92E5" }
      ]),
      isNewArrival: false,
      isTopSelling: true,
      reviews: [
        {
          userName: "Julian S.",
          rating: 5.0,
          comment: "Received so many compliments at a summer wedding. Perfect fit and luxury feel.",
          verified: true
        }
      ]
    },
    {
      name: "Courage Graphic T-shirt",
      description: "Bold contemporary typography statement tee. Pre-shrunk cotton jersey with vintage washed effect.",
      price: 145,
      originalPrice: null,
      discount: null,
      image: "/figma-home/top-2.png",
      galleryImages: JSON.stringify(["/figma-home/top-2.png", "/figma-store/product-8.png"]),
      rating: 4.0,
      reviewCount: 78,
      stock: 15,
      categoryId: tshirts.id,
      dressStyle: "Casual",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Rust Orange", value: "#C05621" },
        { name: "Charcoal", value: "#2D3748" }
      ]),
      isNewArrival: false,
      isTopSelling: true,
      reviews: [
        {
          userName: "Emily W.",
          rating: 4.0,
          comment: "Love the vintage wash aesthetic. Super soft fabric.",
          verified: true
        }
      ]
    },
    {
      name: "Loose Fit Bermuda Shorts",
      description: "Relaxed-fit denim bermuda shorts with raw hem details. Designed for laid-back weekend styling.",
      price: 80,
      originalPrice: null,
      discount: null,
      image: "/figma-home/asset-13.png",
      galleryImages: JSON.stringify(["/figma-home/asset-13.png", "/figma-store/product-9.png"]),
      rating: 3.0,
      reviewCount: 39,
      stock: 20,
      categoryId: shorts.id,
      dressStyle: "Casual",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Vintage Denim", value: "#4A6B82" },
        { name: "Black Denim", value: "#202020" }
      ]),
      isNewArrival: false,
      isTopSelling: true,
      reviews: [
        {
          userName: "Leo G.",
          rating: 3.0,
          comment: "Good relaxed fit for summer days.",
          verified: true
        }
      ]
    },
    {
      name: "Faded Skinny Jeans",
      description: "Heavyweight stretch denim featuring authentic whiskering and hand-sanded fading across the thighs.",
      price: 210,
      originalPrice: null,
      discount: null,
      image: "/figma-home/asset-14.png",
      galleryImages: JSON.stringify(["/figma-home/asset-14.png"]),
      rating: 4.5,
      reviewCount: 110,
      stock: 16,
      categoryId: jeans.id,
      dressStyle: "Casual",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Medium Wash", value: "#3B5998" }
      ]),
      isNewArrival: false,
      isTopSelling: true,
      reviews: [
        {
          userName: "Nathan H.",
          rating: 4.5,
          comment: "The wash looks even better in person than in the pictures!",
          verified: true
        }
      ]
    },
    {
      name: "Gradient Graphic T-shirt",
      description: "Prismatic color-blend graphic tee with custom street calligraphy. 240 GSM heavy cotton.",
      price: 145,
      originalPrice: null,
      discount: null,
      image: "/figma-store/product-1.png",
      galleryImages: JSON.stringify(["/figma-store/product-1.png", "/figma-product/related-2.png"]),
      rating: 3.5,
      reviewCount: 42,
      stock: 25,
      categoryId: tshirts.id,
      dressStyle: "Party",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "White Multi", value: "#FFFFFF" }
      ]),
      isNewArrival: false,
      isTopSelling: false,
      reviews: [
        {
          userName: "Tyler P.",
          rating: 4.0,
          comment: "Eye-catching graphic. Really stands out.",
          verified: true
        }
      ]
    },
    {
      name: "Polo with Tipping Details",
      description: "Textured pique knit polo shirt finished with contrast collar tipping and subtle crest embroidery.",
      price: 180,
      originalPrice: null,
      discount: null,
      image: "/figma-store/product-2.png",
      galleryImages: JSON.stringify(["/figma-store/product-2.png", "/figma-product/related-3.png"]),
      rating: 4.5,
      reviewCount: 86,
      stock: 14,
      categoryId: shirts.id,
      dressStyle: "Formal",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Burgundy", value: "#6A1A24" },
        { name: "Navy", value: "#0A1931" }
      ]),
      isNewArrival: false,
      isTopSelling: false,
      reviews: [
        {
          userName: "Gregory V.",
          rating: 4.5,
          comment: "Premium textured knit, holds its shape nicely around the collar.",
          verified: true
        }
      ]
    },
    {
      name: "Black Striped T-shirt",
      description: "Monochrome baseball raglan tee with clean vertical pin-striping and contrast black sleeves.",
      price: 120,
      originalPrice: 150,
      discount: "-30%",
      image: "/figma-store/product-3.png",
      galleryImages: JSON.stringify(["/figma-store/product-3.png", "/figma-product/related-4.png"]),
      rating: 5.0,
      reviewCount: 92,
      stock: 28,
      categoryId: tshirts.id,
      dressStyle: "Casual",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Monochrome", value: "#000000" }
      ]),
      isNewArrival: false,
      isTopSelling: false,
      reviews: [
        {
          userName: "Zack R.",
          rating: 5.0,
          comment: "My favorite everyday tee. Stretchy, breathable, looks clean.",
          verified: true
        }
      ]
    },
    {
      name: "Polo with Contrast Trims",
      description: "Modern sports polo with reinforced collar stand and contrast white trim on sleeve cuffs.",
      price: 212,
      originalPrice: 242,
      discount: "-20%",
      image: "/figma-product/related-1.png",
      galleryImages: JSON.stringify(["/figma-product/related-1.png"]),
      rating: 4.0,
      reviewCount: 57,
      stock: 19,
      categoryId: shirts.id,
      dressStyle: "Formal",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Cerulean Blue", value: "#006699" },
        { name: "White", value: "#FFFFFF" }
      ]),
      isNewArrival: false,
      isTopSelling: false,
      reviews: [
        {
          userName: "Brandon M.",
          rating: 4.0,
          comment: "Sharp look for business-casual offices.",
          verified: true
        }
      ]
    },
    {
      name: "Oversized Streetwear Hoodie",
      description: "Heavyweight 450 GSM brushed cotton fleece hoodie with dropped shoulders and a double-layered hood.",
      price: 195,
      originalPrice: 230,
      discount: "-15%",
      image: "/figma-home/asset-11.png",
      galleryImages: JSON.stringify(["/figma-home/asset-11.png"]),
      rating: 4.8,
      reviewCount: 164,
      stock: 20,
      categoryId: hoodies.id,
      dressStyle: "Casual",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large", "XX-Large"]),
      colors: JSON.stringify([
        { name: "Sand", value: "#D7C4B7" },
        { name: "Charcoal", value: "#262626" }
      ]),
      isNewArrival: true,
      isTopSelling: true,
      reviews: [
        {
          userName: "Chloe N.",
          rating: 5.0,
          comment: "Incredibly thick and warm. The hood actually stays up and has structure.",
          verified: true
        }
      ]
    },
    {
      name: "Athletic Performance Shorts",
      description: "Four-way stretch gym shorts featuring built-in compression liner, zippered phone pocket, and moisture-wicking weave.",
      price: 95,
      originalPrice: 110,
      discount: "-15%",
      image: "/figma-home/asset-16.png",
      galleryImages: JSON.stringify(["/figma-home/asset-16.png"]),
      rating: 4.7,
      reviewCount: 89,
      stock: 35,
      categoryId: shorts.id,
      dressStyle: "Gym",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Stealth Black", value: "#1A1A1A" },
        { name: "Slate Grey", value: "#4A5568" }
      ]),
      isNewArrival: true,
      isTopSelling: false,
      reviews: [
        {
          userName: "Devon L.",
          rating: 5.0,
          comment: "Best workout shorts I own. The liner is super supportive.",
          verified: true
        }
      ]
    },
    {
      name: "Tailored Slim Fit Blazer",
      description: "Italian wool-blend structured blazer with notch lapels, kissing cuff buttons, and silk lining.",
      price: 340,
      originalPrice: 400,
      discount: "-15%",
      image: "/figma-home/asset-17.png",
      galleryImages: JSON.stringify(["/figma-home/asset-17.png"]),
      rating: 4.9,
      reviewCount: 112,
      stock: 8,
      categoryId: shirts.id,
      dressStyle: "Formal",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Midnight Navy", value: "#000C24" },
        { name: "Charcoal", value: "#2D2D2D" }
      ]),
      isNewArrival: false,
      isTopSelling: true,
      reviews: [
        {
          userName: "Arthur K.",
          rating: 5.0,
          comment: "Incredible tailoring. Fits like a bespoke jacket.",
          verified: true
        }
      ]
    },
    {
      name: "Velvet Party Overshirt",
      description: "Plush cotton-velvet relaxed overshirt with custom iridescent buttons for evening and nightlife attire.",
      price: 220,
      originalPrice: 260,
      discount: "-15%",
      image: "/figma-home/asset-18.png",
      galleryImages: JSON.stringify(["/figma-home/asset-18.png"]),
      rating: 4.6,
      reviewCount: 73,
      stock: 11,
      categoryId: shirts.id,
      dressStyle: "Party",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Emerald", value: "#0F52BA" },
        { name: "Obsidian", value: "#111111" }
      ]),
      isNewArrival: true,
      isTopSelling: false,
      reviews: [
        {
          userName: "Simon D.",
          rating: 5.0,
          comment: "The velvet texture catches the light so nicely at events.",
          verified: true
        }
      ]
    },
    {
      name: "Raw Indigo Selvedge Denim",
      description: "14oz Japanese red-line selvedge denim crafted on vintage shuttle looms. Rigid raw finish that ages uniquely with wear.",
      price: 280,
      originalPrice: null,
      discount: null,
      image: "/figma-home/asset-12.png",
      galleryImages: JSON.stringify(["/figma-home/asset-12.png"]),
      rating: 4.9,
      reviewCount: 130,
      stock: 9,
      categoryId: jeans.id,
      dressStyle: "Casual",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Raw Indigo", value: "#1A2A44" }
      ]),
      isNewArrival: false,
      isTopSelling: true,
      reviews: [
        {
          userName: "Kenji M.",
          rating: 5.0,
          comment: "True connoisseur denim. Stiff at first but breaking in beautifully.",
          verified: true
        }
      ]
    },
    {
      name: "Essential Minimalist Crewneck",
      description: "Clean aesthetic midweight sweatshirt constructed with flatlock stitching and ribbed cuffs.",
      price: 110,
      originalPrice: 130,
      discount: "-15%",
      image: "/figma-home/asset-15.png",
      galleryImages: JSON.stringify(["/figma-home/asset-15.png"]),
      rating: 4.4,
      reviewCount: 61,
      stock: 24,
      categoryId: hoodies.id,
      dressStyle: "Casual",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Heather Grey", value: "#9E9E9E" },
        { name: "Cream", value: "#F5F5DC" }
      ]),
      isNewArrival: false,
      isTopSelling: false,
      reviews: [
        {
          userName: "Rachel S.",
          rating: 4.5,
          comment: "So soft and cozy. Perfect layer for everyday.",
          verified: true
        }
      ]
    },
    {
      name: "Urban Cargo Utility Pants",
      description: "Multi-pocket durable ripstop cotton trousers with adjustable bungee ankles and reinforced knees.",
      price: 175,
      originalPrice: 200,
      discount: "-12%",
      image: "/figma-store/product-4.png",
      galleryImages: JSON.stringify(["/figma-store/product-4.png"]),
      rating: 4.3,
      reviewCount: 52,
      stock: 17,
      categoryId: jeans.id,
      dressStyle: "Casual",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Military Olive", value: "#4B5320" },
        { name: "Matte Black", value: "#1C1C1C" }
      ]),
      isNewArrival: true,
      isTopSelling: false,
      reviews: [
        {
          userName: "Dexter C.",
          rating: 4.5,
          comment: "Pockets are huge and actually practical. Great techwear vibe.",
          verified: true
        }
      ]
    },
    {
      name: "Relaxed Boxy Camp Collar Shirt",
      description: "Breezy lightweight viscose resort shirt with open camp collar and custom art deco print.",
      price: 135,
      originalPrice: 160,
      discount: "-15%",
      image: "/figma-store/product-7.png",
      galleryImages: JSON.stringify(["/figma-store/product-7.png"]),
      rating: 4.7,
      reviewCount: 68,
      stock: 16,
      categoryId: shirts.id,
      dressStyle: "Party",
      sizes: JSON.stringify(["Small", "Medium", "Large", "X-Large"]),
      colors: JSON.stringify([
        { name: "Sage Green", value: "#77815C" },
        { name: "Sand Gold", value: "#C2A649" }
      ]),
      isNewArrival: false,
      isTopSelling: true,
      reviews: [
        {
          userName: "Mateo R.",
          rating: 5.0,
          comment: "The drape of this fabric is unmatched in summer heat.",
          verified: true
        }
      ]
    }
  ]

  for (const item of productsData) {
    const { reviews, ...productData } = item
    const product = await prisma.product.create({
      data: productData
    })

    if (reviews && reviews.length > 0) {
      for (const rev of reviews) {
        await prisma.review.create({
          data: {
            productId: product.id,
            userName: rev.userName,
            rating: rev.rating,
            comment: rev.comment,
            verified: rev.verified
          }
        })
      }
    }
  }

  console.log('Seeding Sample Demo Order...')
  const sampleProduct = await prisma.product.findFirst({ where: { name: "One Life Graphic T-shirt" } })
  if (sampleProduct) {
    await prisma.order.create({
      data: {
        userId: demoUser.id,
        status: "DELIVERED",
        totalAmount: 275,
        subtotal: 260,
        discountAmount: 0,
        deliveryFee: 15,
        shippingName: "Sarah Miller",
        shippingEmail: "sarah.miller@example.com",
        shippingAddress: "123 Fashion Blvd, Apt 4B",
        shippingCity: "New York",
        shippingPostal: "10001",
        shippingCountry: "United States",
        paymentMethod: "Credit Card (Visa ending in 4242)",
        orderItems: {
          create: [
            {
              productId: sampleProduct.id,
              quantity: 1,
              price: 260,
              size: "Large",
              color: "Olive",
              name: sampleProduct.name,
              image: sampleProduct.image
            }
          ]
        }
      }
    })
  }

  console.log('✅ Seeding completed successfully with 20+ rich products!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

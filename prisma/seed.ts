import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create Categories
  const categoryCasual = await prisma.category.upsert({
    where: { name: 'Casual' },
    update: {},
    create: { name: 'Casual', description: 'Casual wear' },
  })
  const categoryFormal = await prisma.category.upsert({
    where: { name: 'Formal' },
    update: {},
    create: { name: 'Formal', description: 'Formal wear' },
  })
  
  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@zenvia.com' },
    update: {},
    create: {
      email: 'admin@zenvia.com',
      password: 'password', // Note: in real app this should be hashed
      name: 'Admin User',
      role: 'ADMIN'
    }
  })

  // Products
  const products = [
    {
      name: "T-shirt with Tape Details",
      image: "/figma-home/new-1.png",
      price: 120,
      rating: 4.5,
    },
    {
      name: "Skinny Fit Jeans",
      image: "/figma-home/new-2.png",
      price: 240,
      originalPrice: 260,
      discount: "-20%",
      rating: 3.5,
    },
    {
      name: "Checkered Shirt",
      image: "/figma-home/new-3.png",
      price: 180,
      rating: 4.5,
    },
    {
      name: "Sleeve Striped T-shirt",
      image: "/figma-home/new-4.png",
      price: 130,
      originalPrice: 160,
      discount: "-30%",
      rating: 4.5,
    },
    {
      name: "Vertical Striped Shirt",
      image: "/figma-home/top-1.png",
      price: 212,
      originalPrice: 232,
      discount: "-20%",
      rating: 5,
    },
    {
      name: "Courage Graphic T-shirt",
      image: "/figma-home/top-2.png",
      price: 145,
      rating: 4,
    },
    {
      name: "Loose Fit Bermuda Shorts",
      image: "/figma-home/asset-13.png",
      price: 80,
      rating: 3,
    },
    {
      name: "Faded Skinny Jeans",
      image: "/figma-home/asset-14.png",
      price: 210,
      rating: 4.5,
    },
    {
      name: "Gradient Graphic T-shirt",
      image: "/figma-store/product-1.png",
      price: 145,
      rating: 3.5,
    },
    {
      name: "Polo with Tipping Details",
      image: "/figma-store/product-2.png",
      price: 180,
      rating: 4.5,
    },
    {
      name: "Black Striped T-shirt",
      image: "/figma-store/product-3.png",
      price: 120,
      originalPrice: 150,
      discount: "-30%",
      rating: 5,
    }
  ]

  console.log('Seeding products...')
  for (const product of products) {
    // try to find by name, if exists skip, else create
    const existing = await prisma.product.findFirst({ where: { name: product.name } })
    if (!existing) {
      await prisma.product.create({
        data: {
          ...product,
          categoryId: categoryCasual.id,
          stock: 10
        }
      })
    }
  }
  
  console.log('Seeding complete.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

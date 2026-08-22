# 🛍️ ZENVIA — Modern Full-Stack E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Auth.js](https://img.shields.io/badge/Auth.js-NextAuth-purple?style=for-the-badge&logo=auth0)](https://authjs.dev/)

> A full-featured, pixel-perfect modern fashion storefront and administrative management system built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Dockerized PostgreSQL.

---

## 🌟 Key Feature Highlights

### 🛍️ 1. Storefront & Product Discovery
* **Dynamic Homepage:** Hero showcase, brand ticker (Versace, Zara, Gucci, Prada, Calvin Klein), dynamic New Arrivals, Top Selling carousels, and Dress Style category navigation.
* **Figma-Accurate Product Detail Page:**
  * Interactive 3-image vertical thumbnail gallery with live preview switching.
  * Selectable color swatches with active checkmark indicators.
  * Size selector pills (`Small`, `Medium`, `Large`, `X-Large`).
  * Quantity counter stepper (`[-] [ 1 ] [+]`).
  * Interactive tabs: *Product Details*, *Rating & Reviews*, and *FAQs*.
  * Verified customer review cards with star ratings and timestamps.
  * **"Write a Review" Modal:** Allows shoppers to submit star ratings and comments that save directly to PostgreSQL and dynamically recalculate product rating averages.
  * "You Might Also Like" related product recommendations.
* **Advanced Shop / Catalog Page (`/shop`):**
  * Multi-dimensional filtering by Category, Price Slider (`$50 - $400`), Color swatches, Sizes, and Dress Style (`Casual`, `Formal`, `Party`, `Gym`).
  * Instant keyword search bar.
  * Real-time sorting (*Most Popular*, *Price: Low to High*, *Price: High to Low*, *Newest*).
  * Responsive Mobile Filter Drawer matching the Figma mobile specification.
  * Full server-side pagination.

### 🛒 2. Cart, Checkout & Orders
* **Global Cart State:** Built with React Context and `localStorage` persistence.
* **Header Cart Sheet & Full Cart Page (`/cart`):**
  * Quick-access slide-out cart drawer + dedicated full `/cart` page.
  * Item quantity stepper, size/color labels, and instant removal.
  * **Promo Code Engine:** Apply valid discount codes like `SAVE20` (20% off), `ZENVIA10` (10% off), or `FREESHIP` (Free delivery).
* **Simulated 256-Bit Checkout:**
  * Shipping address collection and payment method selection (Credit Card, Apple Pay, PayPal).
  * Next.js Server Action that deducts stock and records the purchase in PostgreSQL.
* **Order Confirmation Receipt (`/order/success/[id]`):**
  * Interactive delivery progress timeline (`Confirmed` ➔ `Processing` ➔ `Shipped` ➔ `Delivered`).
  * Itemized receipt with price breakdowns and delivery estimates.

### 🔐 3. Administrative Control Center (`/admin`)
* **Protected Routes:** Secured via Auth.js (NextAuth) session checks with automatic login redirection.
* **Real-time Analytics Dashboard:**
  * Total Revenue, Total Orders, Average Order Value, and Inventory counts.
  * Recent customer orders list and top-performing products.
* **Product Catalog Manager (`/admin/products`):**
  * **"Add New Product" Modal:** Create products with custom categories, pricing, discounts, stock, dress styles, and images.
  * Delete product actions and live inventory status badges.
* **Order Workflow Management (`/admin/orders`):**
  * Live status changer dropdown (`PENDING` ➔ `PAID` ➔ `SHIPPED` ➔ `DELIVERED` ➔ `CANCELLED`).
  * Customer shipping details and item breakdown.

### ❤️ 4. Customer Polish & UX
* **Wishlist System:** Save favorite items to a persistent Wishlist with header badge counts.
* **Toast Notifications:** Instant visual feedback powered by `sonner`.
* **Skeleton Loading:** Seamless loading state animations across all routes.
* **Branded 404 Page:** Custom not-found error handling.

---

## 🏛️ Database Architecture & Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    CATEGORY ||--o{ PRODUCT : contains
    PRODUCT ||--o{ REVIEW : receives
    PRODUCT ||--o{ ORDER_ITEM : included_in
    ORDER ||--o{ ORDER_ITEM : contains

    USER {
        string id PK
        string email UK
        string password
        string name
        string role "USER | ADMIN"
        datetime createdAt
    }

    CATEGORY {
        string id PK
        string name UK
        string slug UK
        string description
    }

    PRODUCT {
        string id PK
        string name
        string description
        float price
        float originalPrice
        string discount
        string image
        string galleryImages "JSON array"
        float rating
        int reviewCount
        int stock
        string dressStyle "Casual | Formal | Party | Gym"
        string sizes "JSON array"
        string colors "JSON array"
        boolean isNewArrival
        boolean isTopSelling
        string categoryId FK
    }

    REVIEW {
        string id PK
        string productId FK
        string userName
        float rating
        string comment
        boolean verified
        datetime createdAt
    }

    ORDER {
        string id PK
        string userId FK
        string status "PENDING | PAID | SHIPPED | DELIVERED"
        float totalAmount
        float subtotal
        float discountAmount
        float deliveryFee
        string promoCode
        string shippingName
        string shippingEmail
        string shippingAddress
        string shippingCity
        string shippingPostal
        string shippingCountry
        string paymentMethod
        datetime createdAt
    }

    ORDER_ITEM {
        string id PK
        string orderId FK
        string productId FK
        int quantity
        float price
        string size
        string color
        string name
        string image
    }
```

---

## 🚀 Quickstart Guide (Run Locally in 60 Seconds)

### 1. Prerequisites
Ensure you have **Node.js (v20+)** and **Docker** installed and running on your machine.

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/zenvia.git
cd zenvia
```

### 3. Start the PostgreSQL Container
```bash
docker compose up -d
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Sync Database & Seed 20+ Products
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 6. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Access Credentials

| Role | Email | Password | Access URL |
| :--- | :--- | :--- | :--- |
| **Store Administrator** | `admin@zenvia.com` | `password` | [http://localhost:3000/login](http://localhost:3000/login) ➔ `/admin` |
| **Demo Customer** | `sarah.miller@example.com` | `password` | [http://localhost:3000/](http://localhost:3000/) |

---

## 📂 Project Directory Structure

```text
├── app/
│   ├── actions.ts              # Next.js Server Actions (Checkout, Reviews, Product CRUD)
│   ├── admin/                  # Protected Admin Panel
│   │   ├── layout.tsx          # Authenticated Sidebar Layout
│   │   ├── page.tsx            # Dashboard & Metrics Overview
│   │   ├── products/page.tsx   # Product Catalog Table & CRUD
│   │   └── orders/page.tsx     # Order Management & Status Workflow
│   ├── api/auth/[...nextauth]/ # Auth.js API route handlers
│   ├── cart/page.tsx           # Dedicated Figma Cart Page
│   ├── shop/page.tsx           # Multi-filter Catalog Page
│   ├── product/[id]/page.tsx   # Dynamic Product Details Page
│   ├── wishlist/page.tsx       # Saved Favorites Page
│   ├── order/success/[id]/     # Order Confirmation Receipt Page
│   ├── login/page.tsx          # Admin & Customer Login Page
│   ├── layout.tsx              # Root Layout & Provider Contexts
│   ├── loading.tsx             # Root Skeleton Loader
│   └── not-found.tsx           # Custom 404 Page
├── components/
│   ├── cart-provider.tsx       # Global Shopping Cart State
│   ├── wishlist-provider.tsx   # Global Wishlist State
│   ├── cart-sheet.tsx          # Header Slide-Out Cart Sheet
│   ├── product-card.tsx        # Reusable Product Card with Ratings
│   ├── product/                # Product Page Interactive Components
│   ├── shop/                   # Catalog Filter Sidebar & Mobile Drawer
│   ├── cart/                   # Cart View & Checkout Dialog
│   ├── admin/                  # Admin Modals & Status Selectors
│   ├── site/                   # Header, Footer, Brand Constants
│   └── ui/                     # Accessible Base UI / shadcn Components
├── prisma/
│   ├── schema.prisma           # Relational PostgreSQL Schema
│   └── seed.ts                 # Seeder with 20+ rich products & reviews
├── public/                     # High-resolution Figma imagery assets
├── docker-compose.yml          # PostgreSQL 15 Docker container spec
└── README.md                   # Project documentation
```

---

## 📜 License
This project is open-source under the [MIT License](LICENSE).

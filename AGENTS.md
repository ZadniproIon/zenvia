# Project Context

## Next.js Note
This repo uses a modern Next.js version that may differ from older defaults. Before making framework-sensitive changes, check the relevant docs in `node_modules/next/dist/docs/` and pay attention to deprecations or breaking changes.

## Product
- Build an e-commerce website based on a Figma template.
- Current implementation priority: build the UI first from the Figma design, then connect backend, data, auth, and payments afterward.

## Tech Stack
- Frontend: Next.js, TypeScript, Tailwind CSS, shadcn/ui
- Backend: Next.js Route Handlers and Server Actions
- Data: PostgreSQL via Docker with Prisma ORM
- Auth: Auth.js with Local Credentials Provider
- Payments: Custom Mock Checkout Flow (Local)
- Hosting: Vercel (Future)
- Images: Local `public/` assets and `public/uploads`

## Working Notes
- Preserve this stack unless the user explicitly changes it.
- Favor UI implementation decisions that fit a later Neon + Prisma + Auth.js + Stripe integration.
- In the first phase, prioritize reusable storefront UI components and faithful Figma implementation over backend wiring.

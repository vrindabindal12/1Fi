# 1Fi Marketplace — SDE Intern Assignment

This repository contains the implementation of the **1Fi Marketplace** feature built as part of the 1Fi SDE Intern Assignment. The feature is integrated into the existing 1Fi Shop application shell.

---

## Overview & Core Requirements

The application extends the 1Fi Shop experience with a segmented control tab interface:

- **Top Brands**: Placeholder tab (as specified in assignment guidelines).
- **Nearby Stores**: Placeholder tab (as specified in assignment guidelines).
- **1Fi Marketplace**: Fully implemented product browsing, variant selection, and EMI plan configuration experience.

Key features implemented:
- **Product Catalog**: Dynamic catalog with search functionality (debounced by 350ms) and category filtering (*Smartphones*, *Laptops*, *Headphones*, *Smartwatches*, *Tablets*, *Televisions*).
- **Product Details Page**: Responsive view displaying product details, high-resolution imagery, and interactive variant selector.
- **Dynamic Pricing & Variants**: Real-time price calculation combining product base price and selected variant adjustment (`basePrice + priceAdjustment`).
- **EMI Plan Selection**: Interactive EMI plan selector rendering tenure duration, monthly payment, interest rate, processing fee, total payable amount, and No-Cost EMI badges.
- **EMI Summary & Proceed Flow**: Selected plan summary card detailing terms, leading to a multi-step confirmation page that preserves selection state across navigation.
- **Mobile-First Layout**: Single-column vertical layout optimized for mobile viewports (320px–550px) inside the 1Fi mobile shell frame, preserving readability on desktop screens.

---

## Technology Stack

- **Frontend Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Database & ORM**: PostgreSQL, Prisma ORM 5.22
- **Iconography**: Lucide React

---

## Data Architecture & Database Schema

The database model is defined in `prisma/schema.prisma` using PostgreSQL:

1. **`Product`**: Stores primary product attributes (`name`, `brand`, `description`, `category`, `basePrice` in INR, `imageUrl`).
2. **`ProductVariant`**: Relational 1:N variants storing option details (`value` e.g., `256GB / Titanium Gray`, `priceAdjustment` in INR).
3. **`EMIPlan`**: Relational 1:N EMI options storing payment terms (`tenureMonths`, `monthlyAmount`, `interestRate`, `processingFee`, `totalAmount`, `isNoCost`).

*Note*: If a local PostgreSQL instance is unreachable during evaluation, the service layer (`lib/services/marketplaceService.ts`) falls back to the dataset defined in `data/seedData.ts` to ensure uninterrupted local testing.

---

## Setup & Local Development

### 1. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env
```
Ensure the `DATABASE_URL` matches your local PostgreSQL setup:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/onefi_marketplace?schema=public"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Migration & Seeding
Generate Prisma Client, push schema migrations, and seed mock marketplace data:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 4. Start Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000/shop` in your browser.

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/marketplace/products` | Retrieves product catalog. Supports `category` and `search` query parameters. |
| `GET` | `/api/marketplace/products/[id]` | Retrieves single product details with associated variants and EMI plans. |
| `GET` | `/api/marketplace/products/[id]/emi-plans` | Retrieves list of EMI plans for a given product ID. |

---

## Verification & Build

To run type checking, ESLint rules, and build production output:
```bash
npm run lint
npm run build
```

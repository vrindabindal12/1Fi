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

## Step-by-Step Assessment Evaluation Guide

To evaluate the complete Marketplace implementation, follow these testing steps:

### Step 1: Local Setup & Server Launch
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Setup environment configuration:
   ```bash
   cp .env.example .env
   ```
3. Initialize database schema and seed mock data:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```
   *(Note: If a PostgreSQL database is unconfigured, the application gracefully falls back to the structured dataset in `data/seedData.ts` for offline testing).*
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000/shop](http://localhost:3000/shop) in your browser.

### Step 2: Test Shop Navigation & Tabs
1. Verify top navigation bar shows `Shop`.
2. Test tab switching between **Top Brands** (placeholder), **Nearby Stores** (placeholder), and **1Fi Marketplace** (functional catalog).

### Step 3: Test Product Catalog & Search/Filters
1. Filter products by category pills (*Smartphones*, *Laptops*, *Headphones*, etc.).
2. Test debounced search bar by typing queries like `"iPhone"`, `"Samsung"`, or `"Sony"`.
3. Clear search filters to verify state resets correctly.

### Step 4: Test Product Details & Variant Pricing
1. Click on any product card (e.g. *Samsung Galaxy S24 Ultra* or *MacBook Air 15" M3*).
2. Test variant selection buttons (e.g., `256GB / Titanium Gray` vs `512GB / Titanium Black`).
3. Verify displayed price updates dynamically (`basePrice + selectedVariant.priceAdjustment`).

### Step 5: Test EMI Selection & Summary Card
1. Click different EMI plan options (e.g., 3, 6, 12, or 24 months).
2. Verify selected card highlights in 1Fi purple with active radio checkmark.
3. Observe the **Selected EMI Summary** dark card updating total loan terms (Monthly EMI, Tenure, Interest Rate, Processing Fee, Total Payable).

### Step 6: Test Proceed & Order Confirmation Flow
1. Click **Proceed with EMI Plan**.
2. Verify navigation to `/shop/product/[id]/confirm` with search params preserving variant and plan IDs.
3. Review the order summary page detailing item name, variant, monthly payment, tenure, interest rate, processing fee, and total payable amount.
4. Click **Confirm & Continue** to test the final confirmed state view.

### Step 7: Automated Quality Verification
Run code quality linting and production build checks:
```bash
npm run lint
npm run build
```

---

## Marketplace Flow

Shop
→ Marketplace
→ Product
→ Variant
→ EMI Plan
→ Confirmation

---

## Tech Stack

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

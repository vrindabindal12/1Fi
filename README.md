# 1Fi Marketplace — SDE Intern Assignment

This repository contains the implementation of the **1Fi Marketplace** feature built as part of the 1Fi SDE Intern Assignment. The feature is integrated into the existing 1Fi Shop application shell.

---

## Overview & Core Features

The application extends the 1Fi Shop experience with a segmented control tab interface:

- **Top Brands**: Placeholder tab (as specified in assignment guidelines).
- **Nearby Stores**: Placeholder tab (as specified in assignment guidelines).
- **1Fi Marketplace**: Fully implemented product browsing, variant selection, dynamic pricing, and EMI plan configuration experience.

### Key Features Implemented
- **Product Catalog & Listing**: Dynamic product listing with debounced search (350ms) and category filtering (*Smartphones*, *Laptops*, *Headphones*, *Smartwatches*, *Tablets*, *Televisions*).
- **Product Details & Variant Selection**: Detailed view with high-resolution imagery and interactive variant selector options.
- **Dynamic Variant Pricing**: Real-time price calculation combining base price and selected variant adjustment (`basePrice + priceAdjustment`).
- **Dynamic EMI Plan Selector**: Interactive tenure selection displaying monthly EMI, tenure, interest rate, processing fee, total payable amount, and No-Cost EMI badges.
- **Selected EMI Summary & Proceed Flow**: Selected plan summary card detailing terms, leading to a multi-step confirmation page preserving selection state.
- **Responsive Mobile-First UI**: Single-column vertical layout optimized for mobile viewports (320px–550px) inside the 1Fi mobile shell frame.
- **Robust UI States**: Dedicated loading spinners, empty search states, and database error fallbacks.

---

## Architecture & Data Flow

```text
UI (React 19 / Next.js App Router)
  │
  ▼
React Hooks & Services (lib/services/marketplaceService.ts)
  │
  ▼
Next.js REST API Routes (app/api/marketplace/*)
  │
  ▼
Prisma ORM (prisma/schema.prisma)
  │
  ▼
PostgreSQL Database (Neon / Supabase / Local)
```

---

## Marketplace User Flow

```text
Shop
 └─► 1Fi Marketplace
      └─► Product Details
           └─► Variant Selection
                └─► EMI Plan Selection
                     └─► Order Confirmation
```

---

## Tech Stack

- **Frontend Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Database & ORM**: PostgreSQL, Prisma ORM 5.22
- **Iconography**: Lucide React

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/marketplace/products` | Retrieves product catalog. Supports `category` and `search` query parameters. |
| `GET` | `/api/marketplace/products/[id]` | Retrieves single product details with associated variants and EMI plans. |
| `GET` | `/api/marketplace/products/[id]/emi-plans` | Retrieves list of EMI plans for a given product ID. |

---

## Local Setup Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` in the root directory:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/onefi_marketplace?schema=public"
```
*(Or paste your Neon / Supabase connection string)*

### 3. Setup Database Schema & Seed Data
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```
*(Note: If PostgreSQL is unreachable, the application gracefully falls back to structured offline data in `data/seedData.ts`)*.

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000/shop](http://localhost:3000/shop) in your browser.

---

## Step-by-Step Assessment Evaluation Guide

To evaluate the complete Marketplace implementation, follow these testing steps:

### Step 1: Shop Navigation & Tabs
1. Verify top navigation bar shows `Shop`.
2. Test tab switching between **Top Brands** (placeholder), **Nearby Stores** (placeholder), and **1Fi Marketplace** (functional catalog).

### Step 2: Product Catalog, Search & Filters
1. Filter products by category pills (*Smartphones*, *Laptops*, *Headphones*, etc.).
2. Test debounced search bar by typing queries like `"iPhone"`, `"Samsung"`, or `"Sony"`.
3. Clear search filters to verify state resets correctly.

### Step 3: Product Details & Variant Pricing
1. Click on any product card (e.g. *Samsung Galaxy S24 Ultra* or *MacBook Air 15" M3*).
2. Test variant selection buttons (e.g., `256GB / Titanium Gray` vs `512GB / Titanium Black`).
3. Verify displayed price updates dynamically (`basePrice + selectedVariant.priceAdjustment`).

### Step 4: EMI Selection & Summary Card
1. Click different EMI plan options (e.g., 3, 6, 12, or 24 months).
2. Verify selected card highlights in 1Fi purple with active radio checkmark.
3. Observe the **Selected EMI Summary** dark card updating total loan terms (Monthly EMI, Tenure, Interest Rate, Processing Fee, Total Payable).

### Step 5: Proceed & Order Confirmation Flow
1. Click **Proceed with EMI Plan**.
2. Verify navigation to `/shop/product/[id]/confirm` with search params preserving variant and plan IDs.
3. Review the order summary page detailing item name, variant, monthly payment, tenure, interest rate, processing fee, and total payable amount.
4. Click **Confirm & Continue** to test the final confirmed state view.

---

## Validation & Code Quality

Run code quality linting and production build checks:
```bash
npm run lint
npm run build
```

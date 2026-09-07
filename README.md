# 1Fi SDE Intern Assignment — 1Fi Marketplace

A mobile-first implementation of the **1Fi Marketplace** feature built inside the existing 1Fi Shop experience.

---

## 📱 Features

- **Integrated Shop Tabs**: Segmented control navigation between *Top Brands* (placeholder), *Nearby Stores* (placeholder), and *1Fi Marketplace* (fully functional).
- **Dynamic Product Catalog**: Browse products with real-time search (debounced 350ms) and category filtering (*Smartphones*, *Laptops*, *Headphones*, *Smartwatches*, *Tablets*, *Televisions*).
- **Product Details & Variant Selector**: View detailed specifications and select variants (Storage/Color) with dynamic price calculation (`basePrice + priceAdjustment`).
- **Flexible EMI Selector & Calculator**: Browse available tenure options (3 to 24 months), view monthly EMI amounts, interest rates, processing fees, total payable amounts, and No-Cost EMI badges.
- **Selected EMI Summary**: Real-time summary card detailing total loan terms.
- **Confirmation Flow**: Multi-step flow preserving product, variant, and EMI plan selection across navigation.
- **Mobile-First Responsive UI**: Optimized for mobile viewports (320px–550px) inside a centered 1Fi app shell container, while maintaining visual hierarchy on tablet and desktop screens.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 (1Fi Purple theme, mobile fintech aesthetic)
- **Database & ORM**: PostgreSQL, Prisma ORM 5.22
- **Icons**: Lucide React

---

## 🗄 Database Architecture

The 1Fi Marketplace schema consists of three relational models in PostgreSQL (`prisma/schema.prisma`):

1. **`Product`**: Stores core product information (`name`, `brand`, `description`, `category`, `basePrice` in INR, `imageUrl`).
2. **`ProductVariant`**: Relational 1:N variants storing variant details (`value` e.g., `256GB / Titanium Gray`, `priceAdjustment` in INR).
3. **`EMIPlan`**: Relational 1:N EMI plans storing loan parameters (`tenureMonths`, `monthlyAmount`, `interestRate`, `processingFee`, `totalAmount`, `isNoCost`).

> **Offline Fallback**: If PostgreSQL is unconfigured or offline, the API service layer (`lib/services/marketplaceService.ts`) automatically falls back to the structured dataset in `data/seedData.ts`.

---

## 🚀 Getting Started

### 1. Environment Setup
Copy the environment template:
```bash
cp .env.example .env
```
Default PostgreSQL connection string:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/onefi_marketplace?schema=public"
```

### 2. Install Dependencies & Generate Prisma Client
```bash
npm install
npx prisma generate
```

### 3. Setup & Seed Database
Push the Prisma schema to your PostgreSQL instance and seed mock products:
```bash
npx prisma db push
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000/shop](http://localhost:3000/shop) in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/marketplace/products` | Fetch product catalog (supports `?category=` and `?search=`) |
| `GET` | `/api/marketplace/products/[id]` | Fetch product details by ID (includes variants & EMI plans) |
| `GET` | `/api/marketplace/products/[id]/emi-plans` | Fetch list of available EMI plans for a product |

---

## 🧪 Verification & Quality Control

Run linting and production build checks:
```bash
npm run lint
npm run build
```

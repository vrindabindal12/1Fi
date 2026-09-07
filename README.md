# 1Fi SDE Intern Assignment — 1Fi Marketplace

A clean implementation of the **1Fi Marketplace** feature built inside the existing 1Fi Shop application shell.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 (Mobile-first responsive design, 1Fi Purple theme)
- **Backend & Database**: Next.js API Routes, PostgreSQL, Prisma ORM 5.22
- **Icons**: Lucide React

---

## Database & Data Architecture (Stage 2)

The 1Fi Marketplace database is modeled with a PostgreSQL relational schema via Prisma ORM:

- **Product**: Core product entity storing `name`, `brand`, `description`, `category`, `basePrice` (in INR integer), `imageUrl`, and timestamps.
- **ProductVariant**: Relational 1:N variants storing `name` (e.g., Storage / Color), `value`, and `priceAdjustment`.
- **EMIPlan**: Relational 1:N EMI options storing `tenureMonths`, `monthlyAmount`, `interestRate`, `processingFee`, `totalAmount`, and `isNoCost` boolean flag.

---

## Setup & Reproduction Commands

### 1. Environment Configuration
Copy the `.env.example` file to `.env` and set your PostgreSQL connection string:
```bash
cp .env.example .env
```
Default connection string format:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/onefi_marketplace?schema=public"
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. Run Database Migrations
Push the schema to your local PostgreSQL instance:
```bash
npx prisma db push
```

### 4. Seed Database
Seed the 7 realistic mock products, variants, and EMI plans into PostgreSQL:
```bash
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```

---

## API Endpoints (Stage 2)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/marketplace/products` | Fetch all products (supports `?category=` & `?search=`) |
| `GET` | `/api/marketplace/products/[id]` | Fetch single product by ID with variants & EMI plans |
| `GET` | `/api/marketplace/products/[id]/emi-plans` | Fetch list of EMI plans for a specific product |

---

## Verification Commands

Run full type check, linting, and production build:
```bash
npm run lint
npm run build
```

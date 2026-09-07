import { PrismaClient } from '@prisma/client';
import { seedProductsData } from '../data/seedData';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Marketplace products database...');

  // Delete existing entries
  await prisma.eMIPlan.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  for (const item of seedProductsData) {
    const { variants, emiPlans, ...productData } = item;

    await prisma.product.create({
      data: {
        ...productData,
        variants: {
          create: variants,
        },
        emiPlans: {
          create: emiPlans,
        },
      },
    });
  }

  console.log(`Seeding complete! ${seedProductsData.length} products inserted into PostgreSQL.`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

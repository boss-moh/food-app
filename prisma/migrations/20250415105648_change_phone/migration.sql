-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'PICKING';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "phone" SET DEFAULT '12312345';

/*
  Warnings:

  - Made the column `imageUrl` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `count` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'DONE';

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "count" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

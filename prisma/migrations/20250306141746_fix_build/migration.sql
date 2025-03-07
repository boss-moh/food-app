/*
  Warnings:

  - You are about to drop the column `calories` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `carbs` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `product` table. All the data in the column will be lost.
  - Added the required column `rating` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "calories",
DROP COLUMN "carbs",
DROP COLUMN "fat",
DROP COLUMN "protein",
ADD COLUMN     "nutritionalInfo" TEXT[],
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;

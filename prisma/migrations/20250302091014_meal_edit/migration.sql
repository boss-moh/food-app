/*
  Warnings:

  - Added the required column `calories` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbs` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prepTime` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "calories" INTEGER NOT NULL,
ADD COLUMN     "carbs" INTEGER NOT NULL,
ADD COLUMN     "fat" INTEGER NOT NULL,
ADD COLUMN     "ingredients" TEXT[],
ADD COLUMN     "prepTime" INTEGER NOT NULL,
ADD COLUMN     "protein" INTEGER NOT NULL;

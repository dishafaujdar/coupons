/*
  Warnings:

  - A unique constraint covering the columns `[CouponCode]` on the table `Coupons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CouponCode` to the `Coupons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupons" ADD COLUMN     "CouponCode" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Coupons_CouponCode_key" ON "Coupons"("CouponCode");

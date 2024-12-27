/*
  Warnings:

  - You are about to drop the column `CouponCode` on the `Coupons` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[RedeemCode]` on the table `Coupons` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Coupons_CouponCode_key";

-- AlterTable
ALTER TABLE "Coupons" DROP COLUMN "CouponCode",
ADD COLUMN     "ImageUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "RedeemCode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "SiteLink" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Coupons_RedeemCode_key" ON "Coupons"("RedeemCode");

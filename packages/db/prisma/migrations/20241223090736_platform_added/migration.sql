/*
  Warnings:

  - Added the required column `platform` to the `Coupons` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('GooglePay', 'PhonePay');

-- AlterTable
ALTER TABLE "Coupons" ADD COLUMN     "platform" "Platform" NOT NULL;

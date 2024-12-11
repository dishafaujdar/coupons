-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Buyer', 'Seller');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupons" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "CreatorId" TEXT NOT NULL,

    CONSTRAINT "Coupons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Coupons_id_key" ON "Coupons"("id");

-- AddForeignKey
ALTER TABLE "Coupons" ADD CONSTRAINT "Coupons_CreatorId_fkey" FOREIGN KEY ("CreatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

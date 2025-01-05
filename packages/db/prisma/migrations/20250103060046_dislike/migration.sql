-- CreateTable
CREATE TABLE "Dislike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "couponId" TEXT NOT NULL,

    CONSTRAINT "Dislike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dislike_id_key" ON "Dislike"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Dislike_userId_couponId_key" ON "Dislike"("userId", "couponId");

-- AddForeignKey
ALTER TABLE "Dislike" ADD CONSTRAINT "Dislike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dislike" ADD CONSTRAINT "Dislike_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

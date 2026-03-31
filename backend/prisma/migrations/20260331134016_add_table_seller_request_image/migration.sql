-- CreateTable
CREATE TABLE "SellerRequestImages" (
    "id" TEXT NOT NULL,
    "sellerRequestId" TEXT NOT NULL,
    "imageKey" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SellerRequestImages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "seller_request_images_seller_request_idx" ON "SellerRequestImages"("sellerRequestId");

-- AddForeignKey
ALTER TABLE "SellerRequestImages" ADD CONSTRAINT "SellerRequestImages_sellerRequestId_fkey" FOREIGN KEY ("sellerRequestId") REFERENCES "SellerRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

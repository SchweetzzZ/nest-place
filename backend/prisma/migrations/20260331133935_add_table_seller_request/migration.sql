-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "SellerRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL,
    "handleBy" TEXT,
    "handleAt" TIMESTAMP(3),
    "adminFeedBack" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SellerRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SellerRequest_cpf_key" ON "SellerRequest"("cpf");

-- CreateIndex
CREATE INDEX "seller_request_user_idx" ON "SellerRequest"("userId");

-- AddForeignKey
ALTER TABLE "SellerRequest" ADD CONSTRAINT "SellerRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

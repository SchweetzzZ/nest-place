/*
  Warnings:

  - You are about to drop the column `handleBy` on the `SellerRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SellerRequest" DROP COLUMN "handleBy",
ADD COLUMN     "handleById" TEXT;

-- AddForeignKey
ALTER TABLE "SellerRequest" ADD CONSTRAINT "SellerRequest_handleById_fkey" FOREIGN KEY ("handleById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

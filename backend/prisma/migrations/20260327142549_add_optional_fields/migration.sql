-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_productId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_serviceId_fkey";

-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "serviceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Servicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

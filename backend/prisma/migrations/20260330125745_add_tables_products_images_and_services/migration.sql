-- CreateTable
CREATE TABLE "products_images" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageKey" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicos_images" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageKey" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servicos_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products_images" ADD CONSTRAINT "products_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicos_images" ADD CONSTRAINT "servicos_images_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

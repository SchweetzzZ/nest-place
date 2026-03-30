-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('product', 'service');

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "itemType" "ItemType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "favorite_user_idx" ON "Favorite"("userId");

-- CreateIndex
CREATE INDEX "favorite_item_idx" ON "Favorite"("itemId", "itemType");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_itemId_itemType_key" ON "Favorite"("userId", "itemId", "itemType");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

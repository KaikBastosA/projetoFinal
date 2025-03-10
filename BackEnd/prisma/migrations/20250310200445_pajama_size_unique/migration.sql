/*
  Warnings:

  - A unique constraint covering the columns `[pajamaId,size]` on the table `pajama_size` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pajama_size_pajamaId_size_key" ON "pajama_size"("pajamaId", "size");

/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "zip_code" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "sales_pajamas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "saleId" TEXT NOT NULL,
    "pajamasId" TEXT NOT NULL,
    CONSTRAINT "sales_pajamas_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sale" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sales_pajamas_pajamasId_fkey" FOREIGN KEY ("pajamasId") REFERENCES "Pajama" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buyer_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "payment_method" TEXT NOT NULL,
    "installments" INTEGER NOT NULL DEFAULT 1,
    "card_number" TEXT,
    "addressId" TEXT NOT NULL,
    CONSTRAINT "sale_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pajama_size" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stock_quantity" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "pajamaId" TEXT NOT NULL,
    CONSTRAINT "pajama_size_pajamaId_fkey" FOREIGN KEY ("pajamaId") REFERENCES "Pajama" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pajama" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "season" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "on_sale" BOOLEAN NOT NULL,
    "sale_percent" REAL
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sales_pajamas_saleId_pajamasId_key" ON "sales_pajamas"("saleId", "pajamasId");

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buyer_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "payment_method" TEXT NOT NULL,
    "installments" INTEGER NOT NULL DEFAULT 1,
    "card_number" TEXT,
    "addressId" TEXT NOT NULL,
    CONSTRAINT "sale_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_sale" ("addressId", "buyer_name", "card_number", "cpf", "id", "installments", "payment_method", "price") SELECT "addressId", "buyer_name", "card_number", "cpf", "id", "installments", "payment_method", "price" FROM "sale";
DROP TABLE "sale";
ALTER TABLE "new_sale" RENAME TO "sale";
CREATE UNIQUE INDEX "sale_addressId_key" ON "sale"("addressId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

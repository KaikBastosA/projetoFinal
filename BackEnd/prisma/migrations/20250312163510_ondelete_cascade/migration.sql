-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sales_pajamas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "saleId" TEXT NOT NULL,
    "pajamasId" TEXT NOT NULL,
    CONSTRAINT "sales_pajamas_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sale" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "sales_pajamas_pajamasId_fkey" FOREIGN KEY ("pajamasId") REFERENCES "Pajama" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sales_pajamas" ("id", "pajamasId", "price", "quantity", "saleId") SELECT "id", "pajamasId", "price", "quantity", "saleId" FROM "sales_pajamas";
DROP TABLE "sales_pajamas";
ALTER TABLE "new_sales_pajamas" RENAME TO "sales_pajamas";
CREATE UNIQUE INDEX "sales_pajamas_saleId_pajamasId_key" ON "sales_pajamas"("saleId", "pajamasId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

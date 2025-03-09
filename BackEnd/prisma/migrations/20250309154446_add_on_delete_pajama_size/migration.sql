-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pajama_size" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stock_quantity" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "pajamaId" TEXT NOT NULL,
    CONSTRAINT "pajama_size_pajamaId_fkey" FOREIGN KEY ("pajamaId") REFERENCES "Pajama" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_pajama_size" ("id", "pajamaId", "size", "stock_quantity") SELECT "id", "pajamaId", "size", "stock_quantity" FROM "pajama_size";
DROP TABLE "pajama_size";
ALTER TABLE "new_pajama_size" RENAME TO "pajama_size";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

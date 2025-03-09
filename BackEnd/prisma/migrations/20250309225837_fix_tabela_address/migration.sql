/*
  Warnings:

  - You are about to drop the column `address` on the `address` table. All the data in the column will be lost.
  - Added the required column `adres` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "zip_code" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "adres" TEXT NOT NULL,
    "number" TEXT NOT NULL
);
INSERT INTO "new_address" ("city", "id", "neighborhood", "number", "state", "zip_code") SELECT "city", "id", "neighborhood", "number", "state", "zip_code" FROM "address";
DROP TABLE "address";
ALTER TABLE "new_address" RENAME TO "address";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

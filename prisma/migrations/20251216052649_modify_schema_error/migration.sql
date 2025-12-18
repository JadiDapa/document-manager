/*
  Warnings:

  - You are about to drop the `DocumentView` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Procedure` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `procedureId` on the `Document` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "DocumentView_documentId_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DocumentView";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Procedure";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Document_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Document" ("createdAt", "description", "fileUrl", "id", "title", "type", "updatedAt", "views") SELECT "createdAt", "description", "fileUrl", "id", "title", "type", "updatedAt", "views" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

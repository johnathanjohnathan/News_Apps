/*
  Warnings:

  - You are about to drop the column `publishedDate` on the `News` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `News` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "publishedDate";

-- CreateIndex
CREATE UNIQUE INDEX "News_title_key" ON "News"("title");

/*
  Warnings:

  - You are about to drop the column `categoryId` on the `JobCategory` table. All the data in the column will be lost.
  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."JobCategory" DROP CONSTRAINT "JobCategory_categoryId_fkey";

-- DropIndex
DROP INDEX "public"."JobCategory_categoryId_key";

-- AlterTable
ALTER TABLE "JobCategory" DROP COLUMN "categoryId";

-- DropTable
DROP TABLE "public"."Job";

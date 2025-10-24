/*
  Warnings:

  - Added the required column `name` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "name",
ADD COLUMN     "name" JSONB NOT NULL;

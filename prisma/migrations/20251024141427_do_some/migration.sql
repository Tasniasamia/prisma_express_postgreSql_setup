/*
  Warnings:

  - Made the column `sit` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "sit" SET NOT NULL,
ALTER COLUMN "sit" SET DEFAULT 0;

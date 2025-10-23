/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `teacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Course" DROP CONSTRAINT "Course_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "public"."teacher" DROP CONSTRAINT "teacher_userId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "teacherId";

-- DropTable
DROP TABLE "public"."teacher";

/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `description` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `image` on the `Coursecategory` table. All the data in the column will be lost.
  - Added the required column `status` to the `Coursecategory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `Coursecategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "description",
ADD COLUMN     "description" JSONB,
ALTER COLUMN "image" SET DATA TYPE TEXT,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Course_id_seq";

-- AlterTable
ALTER TABLE "Coursecategory" DROP COLUMN "image",
ADD COLUMN     "description" JSONB,
ADD COLUMN     "status" BOOLEAN NOT NULL,
DROP COLUMN "name",
ADD COLUMN     "name" JSONB NOT NULL;

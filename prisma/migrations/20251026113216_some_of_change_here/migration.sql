/*
  Warnings:

  - You are about to drop the `contactReply` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."contactReply" DROP CONSTRAINT "contactReply_contactId_fkey";

-- AlterTable
ALTER TABLE "contact" ADD COLUMN     "reply" TEXT;

-- DropTable
DROP TABLE "public"."contactReply";

/*
  Warnings:

  - You are about to drop the column `currency_code` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `currency_symbol` on the `settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "settings" DROP COLUMN "currency_code",
DROP COLUMN "currency_symbol";

-- CreateTable
CREATE TABLE "otp" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

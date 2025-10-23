/*
  Warnings:

  - You are about to drop the column `email_config_id` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `otp_verification_type` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the `EmailConfig` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."settings" DROP CONSTRAINT "settings_email_config_id_fkey";

-- DropIndex
DROP INDEX "public"."settings_email_config_id_key";

-- AlterTable
ALTER TABLE "settings" DROP COLUMN "email_config_id",
DROP COLUMN "otp_verification_type";

-- DropTable
DROP TABLE "public"."EmailConfig";

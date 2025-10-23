/*
  Warnings:

  - You are about to drop the column `cloud_config_id` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the `CloudConfig` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."settings" DROP CONSTRAINT "settings_cloud_config_id_fkey";

-- DropIndex
DROP INDEX "public"."settings_cloud_config_id_key";

-- AlterTable
ALTER TABLE "settings" DROP COLUMN "cloud_config_id",
ALTER COLUMN "otp_verification_type" SET DEFAULT 'email';

-- DropTable
DROP TABLE "public"."CloudConfig";

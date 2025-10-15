/*
  Warnings:

  - You are about to drop the column `cloud_config` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `email_config` on the `settings` table. All the data in the column will be lost.
  - Added the required column `otp` to the `otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "otp" ADD COLUMN     "otp" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "settings" DROP COLUMN "cloud_config",
DROP COLUMN "email_config",
ADD COLUMN     "cloud_config_id" TEXT,
ADD COLUMN     "email_config_id" TEXT;

-- CreateTable
CREATE TABLE "EmailConfig" (
    "id" TEXT NOT NULL,
    "resend_api_key" TEXT NOT NULL,
    "resend_email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CloudConfig" (
    "id" TEXT NOT NULL,
    "cloud_name" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "api_secret" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CloudConfig_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_email_config_id_fkey" FOREIGN KEY ("email_config_id") REFERENCES "EmailConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_cloud_config_id_fkey" FOREIGN KEY ("cloud_config_id") REFERENCES "CloudConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- DropTable
DROP TABLE "public"."user";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "role" "Role" NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip_code" TEXT,
    "address" TEXT,
    "about" TEXT,
    "is_deleted" BOOLEAN,
    "is_modified" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "site_name" TEXT,
    "site_email" TEXT,
    "site_phone" TEXT,
    "site_logo" TEXT,
    "site_address" TEXT,
    "site_description" TEXT,
    "site_footer" TEXT,
    "currency_code" TEXT,
    "currency_symbol" TEXT,
    "client_side_url" TEXT,
    "server_side_url" TEXT,
    "otp_verification_type" TEXT,
    "email_config" JSONB,
    "cloud_config" JSONB,
    "stripe" JSONB,
    "paypal" JSONB,
    "razorpay" JSONB,
    "mollie" JSONB,
    "social_media_link" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_name_email_idx" ON "users"("name" ASC, "email" ASC);

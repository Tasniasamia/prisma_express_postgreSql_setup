/*
  Warnings:

  - A unique constraint covering the columns `[transaction_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "status" SET DEFAULT 'pending';

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transaction_id_key" ON "Payment"("transaction_id");

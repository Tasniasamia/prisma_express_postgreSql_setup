/*
  Warnings:

  - A unique constraint covering the columns `[accountId,friendId]` on the table `messageFriend` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "messageFriend_accountId_friendId_key" ON "messageFriend"("accountId", "friendId");

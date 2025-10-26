-- CreateTable
CREATE TABLE "contactReply" (
    "id" TEXT NOT NULL,
    "replyMessage" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "contactReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contactReply_contactId_key" ON "contactReply"("contactId");

-- AddForeignKey
ALTER TABLE "contactReply" ADD CONSTRAINT "contactReply_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

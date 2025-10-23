-- CreateTable
CREATE TABLE "applyJob" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cover_letter" TEXT,
    "resume" TEXT,
    "JobId" TEXT NOT NULL,

    CONSTRAINT "applyJob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "applyJob" ADD CONSTRAINT "applyJob_JobId_fkey" FOREIGN KEY ("JobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "Jobtype" AS ENUM ('REMOTE', 'HYBRID', 'ONSITE');

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "job_position" TEXT NOT NULL,
    "vacancy" INTEGER,
    "job_context" TEXT,
    "job_responsibility" TEXT,
    "educational_requirement" TEXT,
    "additional_requirements" TEXT,
    "salary" INTEGER,
    "deadLine" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL,
    "jobType" "Jobtype" NOT NULL DEFAULT 'ONSITE',
    "author_name" TEXT NOT NULL,
    "job_location" TEXT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "JobCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobCategory_categoryId_key" ON "JobCategory"("categoryId");

-- AddForeignKey
ALTER TABLE "JobCategory" ADD CONSTRAINT "JobCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

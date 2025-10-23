-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "company_name" JSONB NOT NULL,
    "job_position" JSONB NOT NULL,
    "categoryId" TEXT NOT NULL,
    "vacancy" INTEGER,
    "job_context" JSONB,
    "job_responsibility" JSONB,
    "educational_requirement" JSONB,
    "additional_requirements" JSONB,
    "salary" INTEGER,
    "deadLine" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL,
    "jobType" "Jobtype" NOT NULL DEFAULT 'ONSITE',
    "author_name" JSONB NOT NULL,
    "job_location" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_categoryId_key" ON "Job"("categoryId");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "JobCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

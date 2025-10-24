-- CreateTable
CREATE TABLE "_courseInstructors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_courseInstructors_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_courseInstructors_B_index" ON "_courseInstructors"("B");

-- AddForeignKey
ALTER TABLE "_courseInstructors" ADD CONSTRAINT "_courseInstructors_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_courseInstructors" ADD CONSTRAINT "_courseInstructors_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

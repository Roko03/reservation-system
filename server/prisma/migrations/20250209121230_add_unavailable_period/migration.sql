-- CreateTable
CREATE TABLE "UnavailablePeriod" (
    "id" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnavailablePeriod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UnavailablePeriod_objectId_startDate_endDate_key" ON "UnavailablePeriod"("objectId", "startDate", "endDate");

-- AddForeignKey
ALTER TABLE "UnavailablePeriod" ADD CONSTRAINT "UnavailablePeriod_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "Object"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

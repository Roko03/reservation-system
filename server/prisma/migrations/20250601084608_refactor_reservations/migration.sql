/*
  Warnings:

  - You are about to drop the column `endDate` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Reservation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[objectId,date,time]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Reservation_objectId_startDate_endDate_key";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_objectId_date_time_key" ON "Reservation"("objectId", "date", "time");

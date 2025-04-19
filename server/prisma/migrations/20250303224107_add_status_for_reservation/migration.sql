-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('APPROVED', 'PENDING', 'REJECTED');

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING';

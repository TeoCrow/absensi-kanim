/*
  Warnings:

  - Made the column `latitudeMasuk` on table `absensi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitudeMasuk` on table `absensi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photoMasukUrl` on table `absensi` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "absensi" ALTER COLUMN "absenPulangAt" DROP NOT NULL,
ALTER COLUMN "latitudeMasuk" SET NOT NULL,
ALTER COLUMN "longitudeMasuk" SET NOT NULL,
ALTER COLUMN "photoMasukUrl" SET NOT NULL;

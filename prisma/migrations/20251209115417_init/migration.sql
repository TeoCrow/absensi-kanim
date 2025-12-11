-- CreateTable
CREATE TABLE "absensi" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "absenMasukAt" TIMESTAMP(3) NOT NULL,
    "absenPulangAt" TIMESTAMP(3) NOT NULL,
    "latitudeMasuk" DOUBLE PRECISION,
    "longitudeMasuk" DOUBLE PRECISION,
    "latitudePulang" DOUBLE PRECISION,
    "longitudePulang" DOUBLE PRECISION,
    "photoMasukUrl" TEXT,
    "photoPulangUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "absensi_pkey" PRIMARY KEY ("id")
);

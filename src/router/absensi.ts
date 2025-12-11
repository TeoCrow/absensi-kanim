import { pub } from "@/lib/orpc";
import prisma from "@/lib/prisma";
import { z } from "zod";

export const getAll = pub.handler(async () => {
  return await prisma.absensi.findMany();
});

export const getToday = pub
  .input(
    z.object({
      startDate: z.date(),
    })
  )
  .handler(async ({ input }) => {
    return await prisma.absensi.findMany({
      where: {
        createdAt: {
          gte: input.startDate,
        },
      },
    });
  });

export const getAbsensiMasuk = pub.handler(async () => {
  return await prisma.absensi.findMany();
});

export const getAbsensiPulang = pub.handler(async () => {
  return await prisma.absensi.findMany({
    where: {
      absenPulangAt: { not: null },
    },
  });
});

export const getAbsensiGroupDaily = pub.handler(async () => {
  const absensi = await prisma.absensi.findMany({
    orderBy: {
      absenMasukAt: "desc",
    },
  });

  const groupedByDay = absensi.reduce((acc, item) => {
    const dateKey = item.absenMasukAt.toISOString().split("T")[0];

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }

    acc[dateKey].push(item);

    return acc;
  }, {} as Record<string, typeof absensi>);

  console.log(groupedByDay);
  return groupedByDay;
});

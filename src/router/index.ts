import { getAbsensiGroupDaily, getAbsensiMasuk, getAbsensiPulang, getAll, getToday } from "./absensi";

export const router = {
  absensi: {
    getAbsensiGroupDaily,
    getAll,
    getAbsensiMasuk,
    getAbsensiPulang,
    getToday,
  },
};

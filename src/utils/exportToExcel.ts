import ExcelJS from "exceljs";

interface AbsensiData {
  id: string;
  userId: bigint;
  userName: string;
  statusMasuk: string;
  absenMasukAt: Date;
  latitudeMasuk: number;
  longitudeMasuk: number;
  photoMasukUrl: string;
  absenPulangAt: Date | null;
  latitudePulang: number | null;
  longitudePulang: number | null;
  photoPulangUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

type AbsensiByDate = {
  [date: string]: AbsensiData[];
};

export async function exportAbsensiToExcel(data: AbsensiByDate, filename: string = "Laporan_Absensi.xlsx") {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Laporan Absensi");

  // Set column widths
  worksheet.columns = [
    { header: "No", key: "no", width: 5 },
    { header: "Tanggal", key: "tanggal", width: 12 },
    { header: "Nama", key: "userName", width: 25 },
    { header: "User ID", key: "userId", width: 15 },
    { header: "Status Masuk", key: "statusMasuk", width: 12 },
    { header: "Waktu Masuk", key: "absenMasukAt", width: 20 },
    { header: "Lokasi Masuk", key: "lokasiMasuk", width: 25 },
    { header: "Waktu Pulang", key: "absenPulangAt", width: 20 },
    { header: "Lokasi Pulang", key: "lokasiPulang", width: 25 },
  ];

  // Style header
  worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  worksheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF4472C4" },
  };
  worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };
  worksheet.getRow(1).height = 25;

  // Add data
  let rowNumber = 1;
  const sortedDates = Object.keys(data).sort((a, b) => b.localeCompare(a));

  for (const date of sortedDates) {
    const records = data[date];

    for (const record of records) {
      const row = worksheet.addRow({
        no: rowNumber,
        tanggal: new Date(date).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        userName: record.userName,
        userId: record.userId.toString(),
        statusMasuk: record.statusMasuk === "ON_TIME" ? "Tepat Waktu" : "Terlambat",
        absenMasukAt: new Date(record.absenMasukAt).toLocaleString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Makassar",
        }),
        lokasiMasuk: `${record.latitudeMasuk}, ${record.longitudeMasuk}`,
        absenPulangAt: record.absenPulangAt
          ? new Date(record.absenPulangAt).toLocaleString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZone: "Asia/Makassar",
            })
          : "-",
        lokasiPulang:
          record.latitudePulang && record.longitudePulang ? `${record.latitudePulang}, ${record.longitudePulang}` : "-",
      });

      // Style status masuk
      const statusCell = row.getCell("statusMasuk");
      if (record.statusMasuk === "ON_TIME") {
        statusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFC6EFCE" },
        };
        statusCell.font = { color: { argb: "FF006100" } };
      } else {
        statusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFC7CE" },
        };
        statusCell.font = { color: { argb: "FF9C0006" } };
      }

      // Center alignment untuk beberapa kolom
      row.getCell("no").alignment = { horizontal: "center" };
      row.getCell("tanggal").alignment = { horizontal: "center" };
      row.getCell("statusMasuk").alignment = { horizontal: "center" };

      rowNumber++;
    }
  }

  // Add borders to all cells
  worksheet.eachRow((row, rowNum) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  // Save file
  const buffer = await workbook.xlsx.writeBuffer();

  // For browser environment
  if (typeof window !== "undefined") {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  console.log(`✅ File Excel berhasil dibuat: ${filename}`);
}

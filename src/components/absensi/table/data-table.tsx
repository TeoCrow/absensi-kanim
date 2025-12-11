import { Absensi } from "@/generated/prisma/client";
import { Selection, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useMemo, useState } from "react";
import { RenderCell } from "./columns";

export const columns = [
  { name: "Id", uid: "id" },
  { name: "Nama", uid: "username" },
  { name: "Status", uid: "status" },
  { name: "Jam Masuk", uid: "absenMasukAt" },
  { name: "Foto Masuk", uid: "photoMasukUrl" },
  { name: "Jam Pulang", uid: "absenPulangAt" },
  { name: "Foto Pulang", uid: "photoPulangUrl" },
  { name: "Created At", uid: "createdAt" },
  { name: "Updated At", uid: "updatedAt" },
];

export const INITIAL_VISIBLE_COLUMNS: string[] = [
  "username",
  "status",
  "absenMasukAt",
  "photoMasukUrl",
  "absenPulangAt",
  "photoPulangUrl",
];
interface AbsensiTableProps {
  data: Absensi[] | undefined | null;
}

export default function TableAbsensi({ data }: AbsensiTableProps) {
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));

  const headerColumns = useMemo(() => {
    if (!data?.length) return columns.filter((col) => col.uid === "id");
    if (visibleColumns === "all") return columns;

    return columns.filter((col) => Array.from(visibleColumns).includes(col.uid));
  }, [visibleColumns, data]);

  return (
    <Table aria-label="Example static collection table">
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "start" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data ?? []} loadingContent={<Spinner />}>
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{RenderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
}

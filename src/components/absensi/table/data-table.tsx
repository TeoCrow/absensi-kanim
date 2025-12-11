import { EmptyState } from "@/components/ui/empty-state";
import { Absensi } from "@/generated/prisma/client";
import { exportAbsensiToExcel } from "@/utils/exportToExcel";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Selection,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Download, Table2Icon } from "lucide-react";
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
  isLoading: boolean;
}

export default function TableAbsensi({ data, isLoading }: AbsensiTableProps) {
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));

  const headerColumns = useMemo(() => {
    if (!data?.length) return columns.filter((col) => col.uid === "id");
    if (visibleColumns === "all") return columns;

    return columns.filter((col) => Array.from(visibleColumns).includes(col.uid));
  }, [visibleColumns, data]);

  const handleExport = async () => {
    return await exportAbsensiToExcel(data, "Laporan_Absensi.xlsx");
  };
  return (
    <Card>
      <CardHeader>
        <section className="flex justify-between w-full">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Button isIconOnly variant="shadow" color="primary" size="sm" radius="md" aria-label="Ikon Tabel">
              <Table2Icon size={24} />
            </Button>
            <div>
              <h4 className="font-semibold">Data Absensi</h4>
              {/* <p className="text-xs text-default-600">Total: 12</p> */}
            </div>
          </div>
        </section>
        <Button onPress={handleExport} isIconOnly variant="flat">
          <Download size={16} />
        </Button>
      </CardHeader>
      <CardBody>
        <Table
          radius="sm"
          isStriped
          shadow="none"
          aria-label="Example static collection table"
          classNames={{
            wrapper: "p-0",
            th: "bg-primary/20 text-primary-600",
          }}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "start" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={data ?? []}
            isLoading={isLoading}
            loadingContent={<Spinner />}
            emptyContent={<EmptyState />}
          >
            {(item) => (
              <TableRow key={item.id}>{(columnKey) => <TableCell>{RenderCell(item, columnKey)}</TableCell>}</TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}

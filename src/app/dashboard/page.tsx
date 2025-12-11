"use client";
import TableAbsensi from "@/components/absensi/table/data-table";
import { orpc } from "@/lib/orpc.client";
import { Tab, Tabs } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: getAll } = useQuery(orpc.absensi.getAll.queryOptions());
  const { data: getToday } = useQuery(
    orpc.absensi.getToday.queryOptions({
      input: {
        startDate: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    })
  );

  return (
    <main className="space-y-3">
      <Tabs aria-label="Options">
        <Tab key="today" title="Hari Ini">
          <TableAbsensi data={getToday} />
        </Tab>
        <Tab key="semua-data" title="Semua Data">
          <TableAbsensi data={getAll} />
        </Tab>
      </Tabs>
    </main>
  );
}

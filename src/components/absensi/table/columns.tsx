"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Absensi } from "@/generated/prisma/client";
import { Avatar, Button, Chip, ChipProps, Snippet } from "@heroui/react";
import { format, formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarRange, Clock } from "lucide-react";
import Image from "next/image";
import React from "react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  ON_TIME: "primary",
  LATE: "warning",
};

export const RenderCell = (data: Absensi, columnKey: React.Key) => {
  const cellValue = data[columnKey as keyof Absensi];

  switch (columnKey) {
    case "id":
      return (
        <Snippet hideSymbol size="sm" radius="lg" color="primary">
          {String(cellValue)}
        </Snippet>
      );
    case "username":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize  whitespace-nowrap">{String(data.userName)}</p>
        </div>
      );
    case "status":
      return (
        <div className="flex flex-col">
          <Chip color={statusColorMap[data?.statusMasuk ?? "default"]} size="sm" variant="flat">
            {String(data.statusMasuk === "ON_TIME" ? "Tepat Waktu" : "Terlambat")}
          </Chip>
        </div>
      );
    case "absenMasukAt":
      return data.absenMasukAt ? (
        <>
          <div className="flex items-center gap-2 text-default-600">
            <Clock size={15} className="shrink-0" />
            <p className="text-bold text-sm capitalize whitespace-nowrap">
              {format(new Date(data.absenMasukAt!), "HH:mm", {
                locale: id,
              })}
            </p>
          </div>
          <div className="flex items-center gap-2 text-default-600">
            <CalendarRange size={15} className="shrink-0" />
            <p className="text-bold text-sm capitalize whitespace-nowrap">
              {format(new Date(data.absenMasukAt!), "EEEE, dd MMM yyyy", {
                locale: id,
              })}
            </p>
          </div>
        </>
      ) : (
        <div>-</div>
      );
    case "photoMasukUrl":
      return (
        <div className="flex items-center gap-2">
          <Drawer>
            <DrawerTrigger>
              <Avatar src={data.photoMasukUrl} />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Foto Absen Masuk</DrawerTitle>
                <DrawerDescription>
                  {format(new Date(data.absenMasukAt), "EEEE, dd MMM yyyy HH:mm", {
                    locale: id,
                  })}
                </DrawerDescription>
              </DrawerHeader>
              <div className="max-w-3xl mx-auto ">
                <Image
                  src={data.photoMasukUrl}
                  width={300}
                  height={300}
                  alt={data.userName}
                  className="mx-auto h-96 object-cover"
                />
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button>Tutup</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      );

    case "absenPulangAt":
      return data.absenPulangAt ? (
        <>
          <div className="flex items-center gap-2 text-default-600">
            <Clock size={15} className="shrink-0" />
            <p className="text-bold text-sm capitalize whitespace-nowrap">
              {format(new Date(data.absenPulangAt), "HH:mm", {
                locale: id,
              })}
            </p>
          </div>
          <div className="flex items-center gap-2 text-default-600">
            <CalendarRange size={15} className="shrink-0" />
            <p className="text-bold text-sm capitalize whitespace-nowrap">
              {format(new Date(data.absenPulangAt), "EEEE, dd MMM yyyy", {
                locale: id,
              })}
            </p>
          </div>
        </>
      ) : (
        <div>-</div>
      );

    case "photoPulangUrl":
      return data.photoPulangUrl ? (
        <div className="flex items-center gap-2">
          <Drawer>
            <DrawerTrigger>
              <Avatar src={data.photoPulangUrl} />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Foto Absen Pulang</DrawerTitle>
                <DrawerDescription>
                  {format(new Date(data.absenPulangAt!), "EEEE, dd MMM yyyy HH:mm", {
                    locale: id,
                  })}
                </DrawerDescription>
              </DrawerHeader>
              <div className="max-w-3xl mx-auto ">
                <Image
                  src={data.photoPulangUrl}
                  width={300}
                  height={300}
                  alt={data.userName}
                  className="mx-auto h-96 object-cover"
                />
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button>Tutup</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      ) : (
        <div>-</div>
      );

    case "createdAt":
      return (
        <>
          <div className="flex items-center gap-2">
            <Clock size={15} className="shrink-0" />
            <p className="text-bold text-sm capitalize whitespace-nowrap">
              {formatDistanceToNow(data.createdAt, {
                addSuffix: true,
                locale: id,
              })}
            </p>
          </div>
          <div className="flex items-center gap-2 text-default-600">
            <CalendarRange size={15} className="shrink-0" />
            <p className="text-bold text-sm capitalize whitespace-nowrap">
              {format(new Date(data.createdAt), "EEEE, dd MMM yyyy HH:mm", {
                locale: id,
              })}
            </p>
          </div>
        </>
      );
    case "updatedAt":
      return (
        <>
          <div className="flex items-center gap-2">
            <Clock size={15} className="shrink-0" />
            <p className="text-bold text-sm capitalize whitespace-nowrap">
              {formatDistanceToNow(data.updatedAt, {
                addSuffix: true,
                locale: id,
              })}
            </p>
          </div>
          <div className="flex items-center gap-2 text-default-600">
            <CalendarRange size={15} className="shrink-0" />
            <p className="text-bold text-sm capitalize whitespace-nowrap">
              {format(new Date(data.updatedAt), "EEEE, dd MMM yyyy HH:mm", {
                locale: id,
              })}
            </p>
          </div>
        </>
      );

    default:
      return <span>{String(cellValue)}</span>;
  }
};

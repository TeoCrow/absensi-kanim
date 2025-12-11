import emptyImage from "@/../public/images/empty.png";
import { Image } from "@heroui/react";
import NextImage from "next/image";

import { ReactNode } from "react";

interface EmptyStateProps {
  message?: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({
  message = "Tidak ada data",
  description = "Data yang Anda cari tidak ditemukan",
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-72 px-4 text-center">
      <Image
        src={emptyImage.src}
        alt="Empty state illustration"
        width={200}
        as={NextImage}
        height={200}
        className="mb-4 opacity-90 drop-shadow-2xl w-full h-full"
      />

      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{message}</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-sm">{description}</p>

      {action && <div className="my-4">{action}</div>}
    </div>
  );
};

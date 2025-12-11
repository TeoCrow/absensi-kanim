import { Absensi } from "@/generated/prisma/client";
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@heroui/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, Clock } from "lucide-react";

export const AbsensiItem = ({ items, status }: { items: Absensi; status: string | "MASUK" | "PULANG" }) => {
  const handleOpenGoogleMaps = (latitude: number | null, longitude: number | null) => {
    if (!latitude || !longitude) return;
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    window.open(googleMapsUrl, "_blank");
  };

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold">{items.userName}</h4>

        <small className="text-default-500 flex items-center gap-1.5">
          <Clock size={15} />
          {format(new Date(status == "MASUK" ? items.absenMasukAt : items.absenPulangAt!), "HH:mm", {
            locale: id,
          })}
        </small>

        <small className="text-default-500 flex items-center gap-1.5">
          <Calendar size={15} />
          {format(new Date(status == "MASUK" ? items.absenMasukAt : items.absenPulangAt!), "EEEE, dd MMM yyyy", {
            locale: id,
          })}
        </small>
      </CardHeader>

      <CardBody className="overflow-visible py-2">
        <Image
          alt={items.userName}
          className="object-cover rounded-xl"
          src={status == "MASUK" ? items.photoMasukUrl : items.photoPulangUrl!}
          width={270}
          height={200}
        />
      </CardBody>

      <CardFooter>
        <Button
          fullWidth
          color="primary"
          onPress={() => {
            handleOpenGoogleMaps(
              status === "MASUK" ? items.latitudeMasuk : items.latitudePulang,
              status === "MASUK" ? items.longitudeMasuk : items.longitudePulang
            );
          }}
        >
          Lihat Lokasi
        </Button>
      </CardFooter>
    </Card>
  );
};

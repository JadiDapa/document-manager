import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { deleteRegion, updateRegion } from "@/lib/networks/region";
import { CreateRegionType } from "@/lib/types/region";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Users, Edit, Trash } from "lucide-react";
import { toast } from "sonner";

interface RegionCardProps {
  id: string;
  name: string;
  code: string;
  status: "active" | "inactive";
  customers: number;
  revenue: number;
  workers: number;
  province: string;
  city: string;
  district: string;
  village: string;
  phone: string;
}

export default function RegionCard({
  id,
  name,
  code,
  status,
  customers,
  revenue,
  workers,
  province,
  city,
  district,
  village,
  phone,
}: RegionCardProps) {
  const qc = useQueryClient();

  const { mutateAsync: onDeleteRegion, isPending: deleting } = useMutation({
    mutationFn: () => deleteRegion(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["regions"] });
      toast.success("Region deleted");
    },
    onError: () => {
      toast.error("Failed to delete region");
    },
  });

  // Update
  const { mutateAsync: onUpdateRegion, isPending: updating } = useMutation({
    mutationFn: (values: CreateRegionType) => updateRegion(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["regions"] });
      toast.success("Region updated");
    },
    onError: () => {
      toast.error("Failed to update region");
    },
  });

  const handleDeactivate = () => onUpdateRegion({ status: "INACTIVE" });

  return (
    <Card className="w-full max-w-md rounded-2xl shadow-sm border">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <h2 className="text-xl font-semibold">{name}</h2>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {code}
            </span>
          </div>
          <span className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full">
            {status}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        {/* Stats Row */}
        <div className="flex gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" /> {customers || 0} Pelanggan
          </div>
          <div className="flex items-center gap-1">
            <span>💲</span> Rp {revenue || 0}
          </div>
          <div className="flex items-center gap-1">
            <span>📦</span> {workers || 0} Pekerja
          </div>
        </div>

        <div className="border-t my-2" />

        {/* Info Rows */}
        <InfoRow icon={<span>📍</span>} label="Provinsi" value={province} />
        <InfoRow icon={<span>🏙️</span>} label="Kota" value={city} />
        <InfoRow icon={<span>🗺️</span>} label="Kecamatan" value={district} />
        <InfoRow
          icon={<span>🏠</span>}
          label="Desa/Kelurahan"
          value={village}
        />
        <InfoRow icon={<span>📞</span>} label="Telepon" value={phone} />

        <div className="border-t my-2" />

        {/* Actions */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Belum ada pelanggan</span>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => onUpdateRegion({ city: "Update city" })}
              disabled={updating}
            >
              <Edit className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="destructive"
              onClick={() => onDeleteRegion()}
              disabled={deleting}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Button
          className="w-full mt-3 bg-red-600 hover:bg-red-700"
          onClick={() => handleDeactivate()}
        >
          <Trash className="w-4 h-4 mr-2" /> Nonaktifkan Wilayah
        </Button>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-500 w-5 flex justify-center">{icon}</div>
      <span className="text-gray-500 w-32">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

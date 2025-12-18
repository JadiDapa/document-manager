import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { deleteNAS, updateNAS } from "@/lib/networks/nas";
import { ActiveType, ConnectionType } from "@/lib/types/mikrotik";
import { CreateNasType } from "@/lib/types/nas";
import { RegionType } from "@/lib/types/region";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, Edit, Trash } from "lucide-react";
import { toast } from "sonner";

interface NASCardProps {
  id: string;
  name: string;
  description?: string;
  connectionType: ConnectionType;
  publicIP?: string;
  region: RegionType;
  status: ActiveType;
  secret?: string;
}

export default function NASCard({
  id,
  name,
  description,
  connectionType,
  publicIP,
  region,
  status,
  secret = "•••••••",
}: NASCardProps) {
  const qc = useQueryClient();

  const { mutateAsync: onDeleteNAS, isPending: deleting } = useMutation({
    mutationFn: () => deleteNAS(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nas"] });
      toast.success("NAS deleted");
    },
    onError: () => {
      toast.error("Failed to delete nas");
    },
  });

  const { mutateAsync: onUpdateNAS, isPending: updating } = useMutation({
    mutationFn: (values: CreateNasType) => updateNAS(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nas"] });
      toast.success("NAS updated");
    },
    onError: () => {
      toast.error("Failed to update nas");
    },
  });

  const isOnline = status === ActiveType.ACTIVE;

  return (
    <Card className="w-full max-w-md rounded-xl shadow border">
      {/* Header */}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-gray-500 text-sm">{description}</p>
          </div>

          <span
            className={`text-xs px-3 py-1 rounded-full ${
              isOnline
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3 text-sm">
        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-500">Mode Koneksi</span>
            <span className="font-medium">{connectionType || "VPN"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">IP Server</span>
            <span className="font-medium">{publicIP || "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Protocol</span>
            <span className="font-medium">L2TP, PPTP</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-2 border-t pt-3">
          <div className="flex justify-between items-center gap-4">
            <span className="text-gray-500">Secret: </span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{secret}</span>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <Eye className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => onUpdateNAS({ status: ActiveType.INACTIVE })}
              disabled={updating}
            >
              <Edit className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="destructive"
              onClick={() => onDeleteNAS()}
              disabled={deleting}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="pt-2">
          <Button className="w-full flex items-center gap-2" variant="outline">
            <Eye className="w-4 h-4" />
            Lihat Detail (Script Otomatis)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

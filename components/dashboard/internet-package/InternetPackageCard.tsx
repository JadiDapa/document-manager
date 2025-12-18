import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Edit, Trash, Wifi, Users } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteInternetPackage,
  updateInternetPackage,
} from "@/lib/networks/internet-package";

interface InternetPackageCardProps {
  id: string;
  name: string;
  speedType: string;
  downloadSpeed: number;
  uploadSpeed: number;
  providerPrice: number;
  resellerPrice: number;
  activeperiod: string;
  period?: string | null;
  status: string;
  userCount?: number;
}

export default function InternetPackageCard(props: InternetPackageCardProps) {
  const {
    id,
    name,
    speedType,
    downloadSpeed,
    uploadSpeed,
    providerPrice,
    resellerPrice,
    activeperiod,
    period,
    status,
    userCount = 0,
  } = props;

  const qc = useQueryClient();

  // Delete
  const { mutateAsync: onDelete, isPending: deleting } = useMutation({
    mutationFn: () => deleteInternetPackage(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["internet-packages"] });
      toast.success("Paket berhasil dihapus");
    },
    onError: () => toast.error("Gagal menghapus paket"),
  });

  // Update
  const { mutateAsync: onUpdate, isPending: updating } = useMutation({
    mutationFn: (data: any) => updateInternetPackage(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["internet-packages"] });
      toast.success("Paket berhasil diperbarui");
    },
    onError: () => toast.error("Gagal update paket"),
  });

  return (
    <Card className="rounded-xl shadow-sm border">
      <CardHeader className="pb-1">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
              <Users className="w-4 h-4" /> {userCount}
            </div>
          </div>

          <div className="flex flex-col gap-1 items-end">
            <span
              className={`
                text-xs px-3 py-1 rounded-full
                ${
                  status === "Aktif"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {status}
            </span>

            <span className="text-[11px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
              <Wifi className="w-3 h-3" /> {speedType}
            </span>

            <Button
              size="sm"
              variant="secondary"
              className="text-xs h-6 px-3 rounded-full"
            >
              Tampil Upgrade
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 space-y-2">
        {/* Speed Row */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1 text-blue-600">
            <ArrowDown className="w-4 h-4" /> {downloadSpeed} Mbps
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <ArrowUp className="w-4 h-4" /> {uploadSpeed} Mbps
          </div>
        </div>

        {/* Provider Price */}
        <p className="text-sm text-muted-foreground">
          Harga Provider:{" "}
          <span className="font-semibold text-black">
            Rp {providerPrice.toLocaleString()}{" "}
          </span>
          /bln
        </p>

        {/* Reseller Price */}
        <p className="text-xl font-bold">
          Rp {resellerPrice.toLocaleString()}{" "}
          <span className="text-sm font-medium text-muted-foreground">
            /bln
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-2">
          <Button size="icon" variant="outline" disabled={updating}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            onClick={() => onDelete()}
            disabled={deleting}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

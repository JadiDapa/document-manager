import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { DocumentType } from "../types/document";
import TableSorter from "@/components/root/TableSorter";
import Image from "next/image";
import DocumentDetailDialog from "@/components/root/document/DocumentDetailDialog";

export const documentColumns: ColumnDef<DocumentType>[] = [
  {
    accessorKey: "id",
    accessorFn: (row) => row.id,
    header: ({ column }) => <TableSorter isFirst column={column} header="#" />,
    cell: ({ row }) => (
      <div className="text-primary translate-x-4">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "title",
    accessorFn: (row) => row.title,
    header: ({ column }) => (
      <TableSorter column={column} header="DOCUMENT NAME" />
    ),
    cell: ({ row }) => {
      const { title, fileType, item } = row.original;

      const fileImageMap: Record<string, string> = {
        PDF: "/images/pdf.png",
        DOC: "/images/doc.png",
        IMAGE: "/images/image.png",
        EXCEL: "/images/xls.png",
        VIDEO: "/images/video.png",
      };

      const fileImage = fileImageMap[fileType] ?? "/images/file.png";

      return (
        <div className="flex items-center gap-4 py-4">
          <figure className="relative h-12 w-12">
            <Image
              src={fileImage}
              fill
              alt={fileType}
              className="object-contain"
            />
          </figure>

          <div>
            <p className="text-lg font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">Item : {item.name}</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "type",
    accessorFn: (row) => row.type,
    header: ({ column }) => <TableSorter column={column} header="OCASSION" />,
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <div className="text-lg font-semibold capitalize">
          {type.toLocaleLowerCase()}
        </div>
      );
    },
  },
  {
    accessorKey: "views",
    accessorFn: (row) => row.views,
    header: ({ column }) => <TableSorter column={column} header="VIEWS" />,
    cell: ({ row }) => {
      const views = row.original.views;
      return <div className="text-lg font-semibold capitalize">{views}</div>;
    },
  },
  {
    accessorKey: "date",
    accessorFn: (row) => row.createdAt,
    header: ({ column }) => <TableSorter column={column} header="DATE" />,
    cell: ({ getValue }) => {
      const date = new Date(getValue() as Date);
      return (
        <div>
          <div className="text-primary font-semibold">
            {format(date, "HH.mm", { locale: id })}
          </div>
          <div>{format(date, "d MMMM yyyy")}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "function",
    header: ({ column }) => <TableSorter column={column} header="DETAIL" />,
    cell: ({ row }) => <DocumentDetailDialog document={row.original} />,
  },
];

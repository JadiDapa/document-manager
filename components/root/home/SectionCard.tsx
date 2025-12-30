import { Progress } from "@/components/ui/progress";
import { SectionType } from "@/lib/types/section";
import { Folder, ArrowRight, FileText, Layers } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

const MAX_DOCS = 500; // example limit

export default function SectionCard({ section }: { section: SectionType }) {
  const itemCount = section.items.length;

  const documentCount = section.items.reduce(
    (total, item) => total + item.documents.length,
    0,
  );

  const progress = Math.min(Math.round((documentCount / MAX_DOCS) * 100), 100);

  return (
    <Link
      href={`/sections/${section.id}`}
      className="group block w-72 rounded-2xl border border-purple-100 bg-linear-to-br from-purple-100/80 to-white p-5 shadow-sm transition-all hover:shadow-md"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
          <Folder className="text-primary h-5 w-5" />
        </div>
        <span className="text-xs text-slate-500">
          {formatDistanceToNow(new Date(section.createdAt), {
            addSuffix: true,
          })}
        </span>
      </div>

      {/* Title */}
      <div className="mt-4 space-y-1">
        <h2 className="line-clamp-1 text-lg font-semibold text-slate-800">
          {section.name}
        </h2>
        {section.description && (
          <p className="line-clamp-2 text-sm text-slate-500">
            {section.description}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-slate-600">
          <Layers className="h-4 w-4" />
          <span>{itemCount} Items</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <FileText className="h-4 w-4" />
          <span>{documentCount} Docs</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4 space-y-1">
        <Progress value={progress} className="h-2 bg-white" />
        <div className="flex justify-between text-xs text-slate-500">
          <span>{documentCount} used</span>
          <span>{MAX_DOCS} max</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-sm font-medium text-indigo-700 transition group-hover:translate-x-1">
        View Section
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}

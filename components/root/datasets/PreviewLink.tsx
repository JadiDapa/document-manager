import { SquareArrowOutUpRight } from "lucide-react";

export default function PreviewLink({ url }: { url: string }) {
  return (
    <div className="  px-44 pt-6 pb-24">
      <a
        href={url}
        target="_blank"
        className="flex cursor-pointer items-center gap-2"
      >
        <p className="text-xl">Preview</p>
        <SquareArrowOutUpRight size={16} />
      </a>
    </div>
  );
}

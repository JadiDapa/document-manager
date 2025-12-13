import Image from "next/image";

export default function DatasetCard({
  title,
  desc,
  image,
}: {
  image: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-4 border rounded-xl shadow-sm p-4 w-full md:w-[32%] hover:shadow-md transition  ">
      <div className="min-w-[70px] h-[70px] rounded-md overflow-hidden bg-gray-100">
        <Image
          src={image}
          width={80}
          height={80}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{desc}</p>
      </div>
    </div>
  );
}
